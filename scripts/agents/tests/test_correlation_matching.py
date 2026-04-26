"""Stress tests + correctness tests for CorrelationAgent's cross-agent matching.

These tests cover the deterministic / algorithmic part of the matching pipeline
that the CorrelationAgent ships with. They intentionally do NOT require:
    - Network access
    - A running uAgent runtime / Agentverse mailbox
    - A real MongoDB cluster
    - ASI1-Mini API key

The matching pipeline has these components and is tested at each layer:

    cosine_similarity()         — primitive vector-space ops on EQ vectors
    compute_compatibility()     — weighted scoring of two acoustic profiles
    build_optimal_profile()     — bucket sessions -> learned acoustic profile
    _to_canonical_doc()         — internal -> Mongo schema (camelCase)
    _from_canonical_doc()       — Mongo schema -> internal schema (round-trip)
    vector_search_similar()     — Atlas Vector Search w/ python cosine fallback
    find_matches_for_user()     — end-to-end: load profile -> search -> score

To run:
    pip install -r scripts/requirements.txt pytest
    pytest scripts/agents/tests/ -v
"""

from __future__ import annotations

import json
import math
import os
import random
from typing import Any
from unittest.mock import patch

import pytest

# Disable ASI1-Mini calls so reasoning generation deterministically falls back.
os.environ.pop("ASI1_API_KEY", None)

from agents import correlation_agent as ca  # noqa: E402  (after env mutation)


# ─── helpers ──────────────────────────────────────────────────────────────────

def _profile(
    *,
    user_id: str = "u",
    eq: list[float] | None = None,
    db_range: tuple[float, float] = (45, 55),
    sounds: list[str] | None = None,
    bands: list[str] | None = None,
    optimal_db: float | None = None,
) -> dict:
    """Build a profile dict matching the internal snake_case shape."""
    eq = eq if eq is not None else [0.3, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1]
    optimal_db = (
        optimal_db
        if optimal_db is not None
        else (db_range[0] + db_range[1]) / 2
    )
    return {
        "user_id": user_id,
        "eq_gains": list(eq),
        "db_range": [db_range[0], db_range[1]],
        "optimal_db": optimal_db,
        "preferred_sounds": list(sounds) if sounds is not None else [],
        "preferred_bands": list(bands) if bands is not None else [],
        "confidence": 0.8,
        "data_points": 10,
    }


def _canonical(p: dict) -> dict:
    """Translate a snake_case profile to the canonical Mongo doc shape."""
    return {
        "userId": p["user_id"],
        "type": "agent",
        "agentAddress": p.get("agent_address", f"agent1{p['user_id']}"),
        "optimalProfile": {
            "targetDb": p.get("optimal_db"),
            "dbRange": p.get("db_range"),
            "eqGains": p.get("eq_gains"),
            "preferredBands": p.get("preferred_bands", []),
            "confidence": p.get("confidence", 0.5),
        },
        "preferredSounds": p.get("preferred_sounds", []),
        "studyHours": p.get("study_hours"),
        "focusScoreAvg": p.get("focus_score_avg"),
        "location": p.get("location"),
    }


class _FakeCollection:
    """Minimal stand-in for pymongo.Collection used by vector_search_similar.

    Supports the shape the CorrelationAgent uses: aggregate (which we want to
    blow up so the manual fallback runs) and find().limit() returning docs.
    """

    def __init__(self, docs: list[dict], aggregate_raises: bool = True):
        self._docs = docs
        self._aggregate_raises = aggregate_raises

    def aggregate(self, pipeline: list[dict]):  # pragma: no cover - trivial
        if self._aggregate_raises:
            raise RuntimeError("Atlas Vector Search not configured (test)")
        # If a test wants to exercise the Atlas path, return the docs verbatim.
        return list(self._docs)

    def find(self, query: dict | None = None, *args, **kwargs):
        exclude = None
        if isinstance(query, dict):
            user_q = query.get("userId")
            if isinstance(user_q, dict):
                exclude = user_q.get("$ne")

        matched = [
            d for d in self._docs
            if (exclude is None or d.get("userId") != exclude)
        ]

        class _Cursor:
            def __init__(self, items):
                self._items = items

            def limit(self, n: int):
                return _Cursor(self._items[:n])

            def __iter__(self):
                return iter(self._items)

        return _Cursor(matched)

    def find_one(self, query: dict, *args, **kwargs):
        for d in self._docs:
            if all(d.get(k) == v for k, v in query.items() if not isinstance(v, dict)):
                return d
        return None


# ─── 1. cosine_similarity ────────────────────────────────────────────────────

class TestCosineSimilarity:
    def test_identical_vectors_score_one(self):
        v = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]
        assert ca.cosine_similarity(v, v) == pytest.approx(1.0, abs=1e-9)

    def test_orthogonal_vectors_score_zero(self):
        # Orthogonal in 7-D
        a = [1, 0, 0, 0, 0, 0, 0]
        b = [0, 1, 0, 0, 0, 0, 0]
        assert ca.cosine_similarity(a, b) == pytest.approx(0.0)

    def test_scaled_vectors_unchanged(self):
        a = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]
        b = [x * 7.5 for x in a]
        # cosine is scale-invariant
        assert ca.cosine_similarity(a, b) == pytest.approx(1.0, abs=1e-9)

    def test_zero_vector_returns_zero(self):
        a = [0.0] * 7
        b = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]
        assert ca.cosine_similarity(a, b) == 0.0
        assert ca.cosine_similarity(b, a) == 0.0
        assert ca.cosine_similarity(a, a) == 0.0

    def test_empty_vector_returns_zero(self):
        assert ca.cosine_similarity([], []) == 0.0
        assert ca.cosine_similarity([], [1.0]) == 0.0

    def test_mismatched_length_returns_zero(self):
        # Defensive: shape mismatch shouldn't crash, just return 0.
        assert ca.cosine_similarity([0.1, 0.2], [0.1, 0.2, 0.3]) == 0.0

    def test_negative_components_handled(self):
        # Implementation should still produce mathematically correct cosine
        # for vectors with negative components.
        a = [1.0, 0.0]
        b = [-1.0, 0.0]
        assert ca.cosine_similarity(a, b) == pytest.approx(-1.0)

    def test_symmetric(self):
        rng = random.Random(42)
        for _ in range(20):
            a = [rng.random() for _ in range(7)]
            b = [rng.random() for _ in range(7)]
            assert ca.cosine_similarity(a, b) == pytest.approx(
                ca.cosine_similarity(b, a)
            )


# ─── 2. compute_compatibility ───────────────────────────────────────────────

class TestComputeCompatibility:
    def test_identical_profiles_score_one(self):
        p = _profile(
            eq=[0.5] * 7,
            db_range=(40, 60),
            sounds=["rain", "brown noise"],
            bands=["Mid"],
        )
        scores = ca.compute_compatibility(p, p)
        assert scores["compatibility_score"] == pytest.approx(1.0, abs=1e-3)
        assert scores["eq_similarity"] == pytest.approx(1.0, abs=1e-3)
        assert scores["db_overlap"] == pytest.approx(1.0)
        assert scores["sound_preference_overlap"] == pytest.approx(1.0)

    def test_orthogonal_eq_with_no_overlap(self):
        a = _profile(
            user_id="a",
            eq=[1, 0, 0, 0, 0, 0, 0],
            db_range=(30, 35),
            sounds=["rain"],
        )
        b = _profile(
            user_id="b",
            eq=[0, 1, 0, 0, 0, 0, 0],
            db_range=(60, 70),
            sounds=["pink noise"],
        )
        scores = ca.compute_compatibility(a, b)
        assert scores["eq_similarity"] == pytest.approx(0.0)
        assert scores["db_overlap"] == pytest.approx(0.0)
        assert scores["sound_preference_overlap"] == pytest.approx(0.0)
        assert scores["compatibility_score"] == pytest.approx(0.0)

    def test_weights_match_documented_formula(self):
        """compatibility = 0.5*eq + 0.3*db + 0.2*sound."""
        # eq_sim = 1, db_overlap = 0, sound_overlap = 0  →  0.5
        a = _profile(eq=[0.5] * 7, db_range=(0, 1), sounds=["x"])
        b = _profile(eq=[0.5] * 7, db_range=(100, 101), sounds=["y"])
        scores = ca.compute_compatibility(a, b)
        assert scores["compatibility_score"] == pytest.approx(0.5, abs=1e-3)

        # eq_sim = 0, db_overlap = 1, sound_overlap = 0  →  0.3
        c = _profile(eq=[1, 0, 0, 0, 0, 0, 0], db_range=(40, 60), sounds=["x"])
        d = _profile(eq=[0, 1, 0, 0, 0, 0, 0], db_range=(40, 60), sounds=["y"])
        scores = ca.compute_compatibility(c, d)
        assert scores["compatibility_score"] == pytest.approx(0.3, abs=1e-3)

        # eq_sim = 0, db_overlap = 0, sound_overlap = 1  →  0.2
        e = _profile(eq=[1, 0, 0, 0, 0, 0, 0], db_range=(0, 1), sounds=["rain"])
        f = _profile(eq=[0, 1, 0, 0, 0, 0, 0], db_range=(100, 101), sounds=["rain"])
        scores = ca.compute_compatibility(e, f)
        assert scores["compatibility_score"] == pytest.approx(0.2, abs=1e-3)

    def test_db_overlap_partial(self):
        # ranges [40,55] and [50,60] overlap by 5; total range is max(15,10)=15
        a = _profile(db_range=(40, 55))
        b = _profile(db_range=(50, 60))
        s = ca.compute_compatibility(a, b)
        assert s["db_overlap"] == pytest.approx(5 / 15, abs=1e-3)

    def test_db_overlap_disjoint_is_zero(self):
        a = _profile(db_range=(30, 40))
        b = _profile(db_range=(50, 60))
        s = ca.compute_compatibility(a, b)
        assert s["db_overlap"] == 0.0

    def test_db_overlap_one_fully_contained(self):
        # [45,55] contained in [40,60]; total_range = 20; overlap = 10 → 0.5
        a = _profile(db_range=(40, 60))
        b = _profile(db_range=(45, 55))
        s = ca.compute_compatibility(a, b)
        assert s["db_overlap"] == pytest.approx(0.5, abs=1e-3)

    def test_sound_overlap_jaccard(self):
        a = _profile(sounds=["rain", "cafe", "brown noise"])
        b = _profile(sounds=["rain", "pink noise"])
        s = ca.compute_compatibility(a, b)
        # |intersection|=1, |union|=4
        assert s["sound_preference_overlap"] == pytest.approx(0.25, abs=1e-3)
        assert s["shared_sounds"] == ["rain"]

    def test_missing_fields_dont_crash(self):
        # Empty / partial profiles must score gracefully (no exceptions)
        scores = ca.compute_compatibility({}, {})
        assert isinstance(scores, dict)
        assert "compatibility_score" in scores
        assert 0 <= scores["compatibility_score"] <= 1

    def test_none_lists_treated_as_empty(self):
        a = _profile(sounds=None)  # type: ignore[arg-type]
        b = _profile(sounds=["rain"])
        # Setting None directly:
        a["preferred_sounds"] = None
        s = ca.compute_compatibility(a, b)
        assert s["sound_preference_overlap"] == pytest.approx(0.0)

    def test_score_never_exceeds_one(self):
        rng = random.Random(7)
        for _ in range(100):
            a = _profile(
                eq=[rng.random() for _ in range(7)],
                db_range=(rng.uniform(20, 50), rng.uniform(50, 80)),
                sounds=rng.sample(["rain", "cafe", "brown", "pink", "ocean"], k=2),
            )
            b = _profile(
                eq=[rng.random() for _ in range(7)],
                db_range=(rng.uniform(20, 50), rng.uniform(50, 80)),
                sounds=rng.sample(["rain", "cafe", "brown", "pink", "ocean"], k=2),
            )
            s = ca.compute_compatibility(a, b)
            assert -1.0 <= s["compatibility_score"] <= 1.0
            # eq_similarity range is technically [-1,1] for unconstrained vectors;
            # but with non-negative EQ gains it should stay in [0,1].
            assert 0.0 <= s["eq_similarity"] <= 1.0 + 1e-9
            assert 0.0 <= s["db_overlap"] <= 1.0 + 1e-9
            assert 0.0 <= s["sound_preference_overlap"] <= 1.0 + 1e-9

    def test_compatibility_is_symmetric(self):
        # compute_compatibility should give the same score regardless of arg order.
        rng = random.Random(11)
        for _ in range(25):
            a = _profile(
                eq=[rng.random() for _ in range(7)],
                db_range=(40, 60),
                sounds=rng.sample(["rain", "cafe", "brown"], k=2),
            )
            b = _profile(
                eq=[rng.random() for _ in range(7)],
                db_range=(45, 55),
                sounds=rng.sample(["rain", "ocean", "pink"], k=2),
            )
            s_ab = ca.compute_compatibility(a, b)
            s_ba = ca.compute_compatibility(b, a)
            assert s_ab["compatibility_score"] == pytest.approx(
                s_ba["compatibility_score"], abs=1e-6
            )


# ─── 3. build_optimal_profile ───────────────────────────────────────────────

class TestBuildOptimalProfile:
    def _sessions(self, *triples: tuple[float, list[float], float]) -> str:
        """Helper: triples of (db, eq_bands, productivity_score)."""
        return json.dumps([
            {
                "acoustic": {"overall_db": db, "frequency_bands": bands},
                "productivity_score": prod,
            }
            for db, bands, prod in triples
        ])

    def test_empty_sessions_returns_error(self):
        out = ca.build_optimal_profile(json.dumps([]))
        assert "error" in out
        assert out.get("data_points") == 0

    def test_single_session_too_few(self):
        out = ca.build_optimal_profile(self._sessions(
            (50, [0.5] * 7, 80),
        ))
        assert "error" in out
        assert out.get("data_points") == 1

    def test_invalid_json_returns_error(self):
        out = ca.build_optimal_profile("not-json")
        assert "error" in out

    def test_finds_best_db_bucket(self):
        # The 50dB bucket has the highest avg productivity.
        sessions = self._sessions(
            (50, [0.4] * 7, 90),
            (50, [0.4] * 7, 80),
            (60, [0.4] * 7, 40),
            (60, [0.4] * 7, 30),
            (40, [0.4] * 7, 50),
        )
        out = ca.build_optimal_profile(sessions)
        assert out.get("optimal_db") == 50
        assert out.get("db_range") == [45, 55]

    def test_eq_gains_averaged_from_high_productivity_only(self):
        # productivity >= 60 sessions feed eq_gains; below 60 ones don't.
        sessions = self._sessions(
            (50, [1.0, 0, 0, 0, 0, 0, 0], 80),  # high prod, contributes
            (50, [1.0, 0, 0, 0, 0, 0, 0], 90),  # high prod, contributes
            (50, [0, 1.0, 0, 0, 0, 0, 0], 30),  # low prod, IGNORED for EQ
        )
        out = ca.build_optimal_profile(sessions)
        # Only first two contribute, so eq_gains[0] should be ~1.0
        assert out["eq_gains"][0] == pytest.approx(1.0, abs=1e-3)
        # Band 1 should be 0 because the only contributor was filtered out
        assert out["eq_gains"][1] == pytest.approx(0.0, abs=1e-3)

    def test_confidence_caps_at_one(self):
        sessions_data = [
            {
                "acoustic": {"overall_db": 50, "frequency_bands": [0.3] * 7},
                "productivity_score": 70,
            }
        ] * 30  # > 20 sessions → confidence == 1.0
        out = ca.build_optimal_profile(json.dumps(sessions_data))
        assert out["confidence"] == 1.0

    def test_confidence_scales_linearly_below_twenty(self):
        sessions_data = [
            {
                "acoustic": {"overall_db": 50, "frequency_bands": [0.3] * 7},
                "productivity_score": 70,
            }
        ] * 10
        out = ca.build_optimal_profile(json.dumps(sessions_data))
        # 10/20 = 0.5
        assert out["confidence"] == pytest.approx(0.5, abs=0.01)


# ─── 4. canonical doc round-trip ─────────────────────────────────────────────

class TestCanonicalDoc:
    def test_round_trip_preserves_core_fields(self):
        p = _profile(
            user_id="u1",
            eq=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
            db_range=(40, 60),
            sounds=["rain", "cafe"],
            bands=["Mid"],
            optimal_db=50,
        )
        p["focus_score_avg"] = 75
        p["study_hours"] = "9-5"
        p["location"] = "UCLA"

        doc = ca._to_canonical_doc("u1", p, "agent1xx")
        # Verify the camelCase keys exist where expected
        assert doc["userId"] == "u1"
        assert doc["agentAddress"] == "agent1xx"
        assert doc["optimalProfile"]["eqGains"] == p["eq_gains"]
        assert doc["optimalProfile"]["dbRange"] == p["db_range"]
        assert doc["preferredSounds"] == ["rain", "cafe"]
        assert doc["studyHours"] == "9-5"
        assert doc["focusScoreAvg"] == 75
        assert doc["location"] == "UCLA"

        # Now read it back
        round_tripped = ca._from_canonical_doc(doc)
        assert round_tripped is not None
        assert round_tripped["user_id"] == "u1"
        assert round_tripped["eq_gains"] == p["eq_gains"]
        assert round_tripped["db_range"] == p["db_range"]
        assert round_tripped["preferred_sounds"] == ["rain", "cafe"]
        assert round_tripped["focus_score_avg"] == 75

    def test_falls_back_to_eq_vector_when_optimal_profile_missing(self):
        legacy_doc = {
            "userId": "legacy",
            "eqVector": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
            "optimalDbRange": [40, 55],
        }
        out = ca._from_canonical_doc(legacy_doc)
        assert out["eq_gains"] == legacy_doc["eqVector"]
        assert out["db_range"] == legacy_doc["optimalDbRange"]
        # optimal_db derived from midpoint of fallback range
        assert out["optimal_db"] == pytest.approx(47.5)

    def test_handles_none(self):
        assert ca._from_canonical_doc(None) is None


# ─── 5. vector_search_similar (manual fallback path) ─────────────────────────

class TestVectorSearchFallback:
    def test_returns_top_k_by_cosine(self):
        target = _profile(eq=[1, 0, 0, 0, 0, 0, 0], user_id="me")
        # Candidate population with varying similarity to target
        candidates = [
            _profile(user_id=f"u{i}", eq=eq)
            for i, eq in enumerate([
                [1, 0, 0, 0, 0, 0, 0],     # cos=1.0
                [0.9, 0.1, 0, 0, 0, 0, 0], # cos≈0.994
                [0, 1, 0, 0, 0, 0, 0],     # cos=0
                [-1, 0, 0, 0, 0, 0, 0],    # cos=-1
                [0.5, 0.5, 0, 0, 0, 0, 0], # cos≈0.707
            ], start=0)
        ]
        docs = [_canonical(p) for p in candidates] + [_canonical(target)]
        coll = _FakeCollection(docs)

        with patch.object(ca, "_get_profiles_collection", return_value=coll):
            results = ca.vector_search_similar(
                query_vector=target["eq_gains"],
                exclude_user_id="me",
                top_k=3,
            )

        assert len(results) == 3
        # Top result should be the identical one
        assert results[0]["user_id"] == "u0"
        assert results[0]["score"] == pytest.approx(1.0, abs=1e-3)
        # Order should be descending similarity
        scores = [r["score"] for r in results]
        assert scores == sorted(scores, reverse=True)
        # Excluded user should never appear
        assert all(r["user_id"] != "me" for r in results)

    def test_skips_candidates_without_eq_vector(self):
        target = _profile(eq=[0.5] * 7, user_id="me")
        good = _profile(user_id="good", eq=[0.5] * 7)
        bad = {"userId": "bad", "type": "agent"}  # no eqGains/eqVector

        coll = _FakeCollection([_canonical(good), bad])
        with patch.object(ca, "_get_profiles_collection", return_value=coll):
            results = ca.vector_search_similar(target["eq_gains"], "me", top_k=5)

        ids = [r.get("user_id") for r in results]
        assert "good" in ids
        assert "bad" not in ids

    def test_no_collection_returns_empty(self):
        with patch.object(ca, "_get_profiles_collection", return_value=None):
            results = ca.vector_search_similar([1, 0, 0, 0, 0, 0, 0], "me", top_k=5)
        assert results == []

    def test_empty_query_vector_returns_empty(self):
        coll = _FakeCollection([])
        with patch.object(ca, "_get_profiles_collection", return_value=coll):
            results = ca.vector_search_similar([], "me", top_k=5)
        assert results == []


# ─── 6. find_matches_for_user (full pipeline, mocked Mongo) ──────────────────

class TestFindMatchesForUser:
    def test_returns_empty_when_no_self_profile(self):
        with patch.object(ca, "fetch_profile", return_value=None):
            assert ca.find_matches_for_user("missing-user", top_k=3) == []

    def test_returns_empty_when_self_profile_lacks_eq(self):
        with patch.object(ca, "fetch_profile", return_value={"user_id": "x"}):
            assert ca.find_matches_for_user("x", top_k=3) == []

    def test_end_to_end_ranks_matches_descending(self):
        me = _profile(user_id="me", eq=[1, 0, 0, 0, 0, 0, 0], sounds=["rain"])

        candidates = [
            _profile(user_id="similar", eq=[1, 0, 0, 0, 0, 0, 0], sounds=["rain"]),
            _profile(user_id="medium", eq=[0.7, 0.3, 0, 0, 0, 0, 0], sounds=["rain"]),
            _profile(user_id="far", eq=[0, 0, 0, 0, 0, 0, 1], sounds=["pink"]),
        ]
        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=5)

        assert len(matches) == 3
        ids = [m["user_id"] for m in matches]
        # Identical profile should be top
        assert ids[0] == "similar"
        # Scores must be sorted descending
        comp = [m["compatibility_score"] for m in matches]
        assert comp == sorted(comp, reverse=True)
        # Each match must have the expected serialized shape
        for m in matches:
            assert "compatibility_score" in m
            assert "eq_similarity" in m
            assert "db_overlap" in m
            assert "sound_overlap" in m
            assert "shared_sounds" in m
            assert "candidate_profile" in m
            assert isinstance(m["reasoning"], str)


# ─── 7. STRESS TESTS ─────────────────────────────────────────────────────────
# Generate many synthetic profiles and verify ranking behaviour at scale.

class TestStress:
    @pytest.mark.parametrize("n_profiles", [50, 200, 499])
    def test_large_pool_ranks_correctly(self, n_profiles: int):
        """Within the 500-candidate cap of the manual fallback, the planted
        perfect match should always rank #1.

        NOTE: vector_search_similar's manual cosine-similarity fallback caps
        candidates at 500 (see correlation_agent.py L606). This is intentional
        to bound memory on community-tier MongoDB. See the separate
        ``test_500_candidate_cap_can_drop_planted_match`` for the limit case.
        """
        rng = random.Random(2026)

        # The "self" profile - we'll compare similarity against this.
        me_eq = [0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1]
        me = _profile(user_id="me", eq=me_eq, sounds=["rain", "brown noise"])

        # Generate N random candidates.
        def _rand_eq() -> list[float]:
            return [rng.random() for _ in range(7)]

        # Plant the "perfect" candidate FIRST so it survives the .limit(500)
        # truncation regardless of pool size up to 499.
        perfect = _profile(
            user_id="perfect",
            eq=me_eq,
            db_range=(45, 55),
            sounds=["rain", "brown noise"],
        )
        candidates = [perfect] + [
            _profile(
                user_id=f"u{i}",
                eq=_rand_eq(),
                db_range=(rng.uniform(30, 50), rng.uniform(50, 70)),
                sounds=rng.sample(
                    ["rain", "brown noise", "cafe", "ocean", "pink", "forest"],
                    k=rng.randint(1, 3),
                ),
            )
            for i in range(n_profiles)
        ]

        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=10)

        assert len(matches) == 10
        # Strict ordering check
        comp = [m["compatibility_score"] for m in matches]
        assert comp == sorted(comp, reverse=True), (
            "Matches must be ordered by descending compatibility_score"
        )
        # Planted perfect candidate must be rank 1
        assert matches[0]["user_id"] == "perfect"
        assert matches[0]["compatibility_score"] == pytest.approx(1.0, abs=1e-3)

    def test_stable_for_orthogonal_pool(self):
        """All-orthogonal pool: every candidate should score around the
        db_overlap + sound_overlap floor (no EQ similarity contribution)."""
        rng = random.Random(0)

        # Self has EQ concentrated in band 0.
        me = _profile(user_id="me", eq=[1, 0, 0, 0, 0, 0, 0], sounds=["rain"])

        # Every candidate has EQ orthogonal to self (zero in band 0).
        candidates = []
        for i in range(50):
            eq = [0.0] + [rng.random() for _ in range(6)]
            candidates.append(_profile(user_id=f"u{i}", eq=eq, sounds=["rain"]))

        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=10)

        for m in matches:
            # eq_similarity must be 0 (orthogonal)
            assert m["eq_similarity"] == pytest.approx(0.0, abs=1e-9)
            # but compat is bounded by 0.3 (db) + 0.2 (sound) = 0.5 max
            assert m["compatibility_score"] <= 0.5 + 1e-9

    def test_self_excluded_from_results(self):
        """The user's own profile must never be returned as a match candidate."""
        me = _profile(user_id="me", eq=[0.4] * 7)
        # Pool that includes "me" plus a couple of strangers.
        all_profiles = [
            _profile(user_id="me", eq=[0.4] * 7),  # decoy with same id
            _profile(user_id="alice", eq=[0.5] * 7),
            _profile(user_id="bob", eq=[0.3] * 7),
        ]
        docs = [_canonical(p) for p in all_profiles]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=10)

        ids = [m["user_id"] for m in matches]
        assert "me" not in ids
        assert set(ids) == {"alice", "bob"}

    def test_top_k_respects_limit(self):
        me = _profile(user_id="me", eq=[0.4] * 7)
        candidates = [_profile(user_id=f"u{i}", eq=[0.4] * 7) for i in range(50)]
        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            for k in [1, 3, 7, 25]:
                matches = ca.find_matches_for_user("me", top_k=k)
                assert len(matches) == k

    def test_adversarial_zero_vector_candidate_does_not_crash(self):
        me = _profile(user_id="me", eq=[0.4] * 7)
        candidates = [
            _profile(user_id="zeros", eq=[0.0] * 7),
            _profile(user_id="normal", eq=[0.4] * 7),
        ]
        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=5)

        ids = [m["user_id"] for m in matches]
        assert "zeros" in ids
        assert "normal" in ids
        # Normal profile must outrank zero vector (which has eq_sim=0)
        normal_idx = ids.index("normal")
        zeros_idx = ids.index("zeros")
        assert normal_idx < zeros_idx

    def test_500_candidate_cap_can_drop_planted_match(self):
        """Documents a real limitation of the manual fallback path:
        vector_search_similar caps at 500 candidates per query (memory bound
        for community-tier MongoDB). If MongoDB returns >500 profiles in
        unsorted insertion order and the most-similar profile sits past the
        500th position, it never enters the cosine-similarity ranking loop
        and silently disappears from the results.

        With Atlas Vector Search enabled (the production path) this is a
        non-issue because the index returns top-K directly. Surfaced here
        so the team is aware of it.
        """
        rng = random.Random(99)
        me_eq = [0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1]
        me = _profile(user_id="me", eq=me_eq, sounds=["rain"])

        def _rand_eq() -> list[float]:
            return [rng.random() for _ in range(7)]

        # 600 random profiles, then the perfect match LAST.
        random_profiles = [
            _profile(user_id=f"u{i}", eq=_rand_eq()) for i in range(600)
        ]
        perfect = _profile(user_id="hidden-perfect", eq=me_eq, sounds=["rain"])
        all_profiles = random_profiles + [perfect]

        docs = [_canonical(p) for p in all_profiles]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=10)

        ids = [m["user_id"] for m in matches]
        # Document the actual behaviour: the planted perfect match past
        # position 500 is dropped. If this assertion ever flips, it means
        # the cap was raised or removed - update the docstring.
        assert "hidden-perfect" not in ids, (
            "If this fails, the 500-candidate cap was lifted - "
            "update test_500_candidate_cap_can_drop_planted_match accordingly."
        )

    def test_identical_pool_returns_all_perfect_scores(self):
        me = _profile(user_id="me", eq=[0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1],
                      sounds=["rain"])
        candidates = [
            _profile(user_id=f"clone-{i}",
                     eq=[0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1],
                     sounds=["rain"])
            for i in range(20)
        ]
        docs = [_canonical(p) for p in candidates]
        coll = _FakeCollection(docs)

        with patch.object(ca, "fetch_profile", return_value=me), \
             patch.object(ca, "_get_profiles_collection", return_value=coll), \
             patch.object(ca, "call_asi1_mini", return_value=""):
            matches = ca.find_matches_for_user("me", top_k=10)

        for m in matches:
            assert m["compatibility_score"] == pytest.approx(1.0, abs=1e-3)


# ─── 8. _serialize_match shape contract ──────────────────────────────────────

class TestSerializeMatch:
    def test_full_field_set(self):
        cand = _profile(user_id="alice", sounds=["rain"])
        cand["agent_address"] = "agent1abc"
        cand["score"] = 0.91

        scores = ca.compute_compatibility(cand, cand)
        out = ca._serialize_match(cand, scores, "great match")

        assert out["user_id"] == "alice"
        assert out["agent_address"] == "agent1abc"
        assert out["vector_score"] == 0.91
        assert out["reasoning"] == "great match"
        assert "candidate_profile" in out
        # Required candidate_profile keys
        for k in (
            "optimal_db", "db_range", "eq_gains", "preferred_bands",
            "preferred_sounds", "confidence", "study_hours",
            "focus_score_avg", "location",
        ):
            assert k in out["candidate_profile"], f"missing {k}"

    def test_jsonable(self):
        cand = _profile(user_id="alice")
        scores = ca.compute_compatibility(cand, cand)
        out = ca._serialize_match(cand, scores, "ok")
        # Must serialize cleanly - no datetime / object weirdness
        json.dumps(out)
