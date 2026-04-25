"""Live integration test: run two CorrelationAgents + a test client in a uAgents
Bureau (single process), seed two profiles in MongoDB, send FindMatchesRequest
from the client to agent A, observe:

    1. Agent A receives FindMatchesRequest, runs vector_search_similar against
       MongoDB, finds agent B's profile.
    2. Agent A sends a ProfileExchangeRequest to agent B (cross-agent message).
    3. Agent B receives ProfileExchangeRequest, computes compatibility,
       responds with ProfileExchangeResponse + ASI1-Mini reasoning.
    4. Agent A returns FindMatchesResponse to the client with ranked matches.

This is *the* end-to-end agent-to-agent test for the correlation pipeline.

Required env vars (loaded from project .env):
    ASI1_API_KEY, AGENTVERSE_API_KEY, MONGODB_URI

Run:
    python scripts/agents/tests/live_two_agent_test.py
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

# Ensure the scripts/ dir is on sys.path so `agents.correlation_agent` resolves.
_SCRIPTS_DIR = Path(__file__).resolve().parent.parent.parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))

from dotenv import load_dotenv  # noqa: E402

load_dotenv(_SCRIPTS_DIR.parent / ".env")

# Pre-import the correlation_agent module so we can override env vars in
# create_agent() per instance.
from agents import correlation_agent as ca  # noqa: E402
from uagents import Agent, Bureau, Context  # noqa: E402


# ─── Test config ─────────────────────────────────────────────────────────────

USER_A = "test-live-a"
USER_B = "test-live-b"

PROFILE_A = {
    "optimal_db": 50,
    "db_range": [45, 55],
    "eq_gains": [0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1],
    "preferred_bands": ["Low-mid", "Mid"],
    "preferred_sounds": ["rain", "brown noise"],
    "confidence": 0.85,
    "data_points": 12,
    "study_hours": "9-5",
    "focus_score_avg": 75,
    "location": "UCLA Library",
    "insight": "Test profile A",
}
PROFILE_B = {
    "optimal_db": 52,
    "db_range": [47, 57],
    "eq_gains": [0.45, 0.55, 0.55, 0.4, 0.3, 0.2, 0.12],
    "preferred_bands": ["Low-mid", "Mid"],
    "preferred_sounds": ["rain", "pink noise"],
    "confidence": 0.82,
    "data_points": 10,
    "study_hours": "10-6",
    "focus_score_avg": 78,
    "location": "UCLA Powell",
    "insight": "Test profile B",
}


# ─── Build the two CorrelationAgents ─────────────────────────────────────────

def _build_correlation(user_id: str, port: int, seed_suffix: str) -> Agent:
    """Build a CorrelationAgent bound to a given user_id and port. We
    intentionally do NOT call ca.create_agent() because that uses module-
    level env vars; instead we set env vars before constructing it.
    """
    os.environ["CORRELATION_USER_ID"] = user_id
    os.environ["CORRELATION_AGENT_PORT"] = str(port)
    os.environ["CORRELATION_AGENT_SEED"] = (
        f"residue-correlation-test-{seed_suffix}-v1"
    )
    return ca.create_agent()


agent_a = _build_correlation(USER_A, 9971, "user-a")
print(f"[setup] agent A = {agent_a.address}")

agent_b = _build_correlation(USER_B, 9972, "user-b")
print(f"[setup] agent B = {agent_b.address}")

# Clear CORRELATION_USER_ID so neither agent's startup handler auto-registers
# under the wrong (last-set) user_id. Bureau-mode agents share os.environ
# at runtime; production runs them as separate processes so this is moot
# outside this test.
os.environ.pop("CORRELATION_USER_ID", None)


# ─── Pin agent addresses to the seeded MongoDB profiles ──────────────────────
ca.upsert_agent_address(USER_A, str(agent_a.address))
ca.upsert_agent_address(USER_B, str(agent_b.address))

# Re-upsert both profiles so eqGains etc. survive any prior runs.
ca.upsert_profile(USER_A, PROFILE_A, str(agent_a.address))
ca.upsert_profile(USER_B, PROFILE_B, str(agent_b.address))
print(f"[setup] seeded MongoDB profiles for {USER_A} and {USER_B}")


# ─── Build the test client agent ─────────────────────────────────────────────
# Note: the client is a plain uAgent that sends FindMatchesRequest -> agent A
# and prints the FindMatchesResponse it gets back.

client = Agent(
    name="match_test_client",
    seed="residue-correlation-test-client-v1",
    port=9970,
    endpoint=["http://localhost:9970/submit"],
)
print(f"[setup] client = {client.address}")


_RESULT: dict = {}


@client.on_event("startup")
async def kickoff(ctx: Context):
    ctx.logger.info(f"Client up. Sending FindMatchesRequest to agent A for {USER_A}")
    await ctx.send(
        agent_a.address,
        ca.FindMatchesRequest(user_id=USER_A, top_k=3),
    )


@client.on_message(ca.FindMatchesResponse)
async def handle_response(ctx: Context, sender: str, msg: ca.FindMatchesResponse):
    ctx.logger.info(f"=== FindMatchesResponse received from {sender[:30]}... ===")
    try:
        matches = json.loads(msg.matches_json or "[]")
    except json.JSONDecodeError:
        matches = []
    _RESULT["matches"] = matches
    _RESULT["received_from"] = sender
    _RESULT["responder_user_id"] = msg.user_id
    _RESULT["timestamp"] = time.time()


# ─── Run the bureau with a hard timeout ──────────────────────────────────────

BUREAU_PORT = 9990
bureau = Bureau(
    port=BUREAU_PORT,
    endpoint=[f"http://localhost:{BUREAU_PORT}/submit"],
)
bureau.add(agent_a)
bureau.add(agent_b)
bureau.add(client)


def _run_bureau_in_thread():
    """bureau.run() spins its own event loop; runs forever in a daemon
    thread so the main thread can poll _RESULT and exit cleanly."""
    import threading
    t = threading.Thread(target=bureau.run, daemon=True, name="bureau")
    t.start()


def wait_for_result(timeout_seconds: float):
    deadline = time.monotonic() + timeout_seconds
    while time.monotonic() < deadline:
        time.sleep(0.5)
        if "matches" in _RESULT:
            time.sleep(3.0)  # give cross-agent exchange time to flush
            return


def main():
    print("\n" + "=" * 70)
    print("LIVE TWO-AGENT CORRELATION TEST")
    print("=" * 70)
    print(f"Agent A:  {agent_a.address}")
    print(f"Agent B:  {agent_b.address}")
    print(f"Client:   {client.address}")
    print("=" * 70 + "\n")

    _run_bureau_in_thread()
    wait_for_result(timeout_seconds=60.0)

    print("\n" + "=" * 70)
    print("RESULT")
    print("=" * 70)
    if "matches" not in _RESULT:
        print("FAIL: no FindMatchesResponse received within timeout.")
        sys.exit(1)

    print(f"Received from: {_RESULT['received_from'][:40]}...")
    print(f"Responder user_id: {_RESULT['responder_user_id']}")
    print(f"Match count: {len(_RESULT['matches'])}")
    for i, m in enumerate(_RESULT["matches"]):
        print(f"\n  [match #{i+1}]")
        print(f"    user_id           : {m.get('user_id')}")
        print(f"    compatibility     : {m.get('compatibility_score'):.3f}")
        print(f"    eq_similarity     : {m.get('eq_similarity'):.3f}")
        print(f"    db_overlap        : {m.get('db_overlap'):.3f}")
        print(f"    sound_overlap     : {m.get('sound_overlap'):.3f}")
        print(f"    shared_sounds     : {m.get('shared_sounds')}")
        print(f"    agent_address     : {(m.get('agent_address') or '')[:40]}...")
        reasoning = m.get("reasoning", "")
        print(f"    reasoning         : {reasoning[:160]}{'…' if len(reasoning) > 160 else ''}")

    # Assertions
    assert _RESULT["responder_user_id"] == USER_A
    assert len(_RESULT["matches"]) >= 1, "expected at least one match"
    top = _RESULT["matches"][0]
    assert top["user_id"] == USER_B, f"expected USER_B as top match, got {top['user_id']}"
    assert top["compatibility_score"] > 0.5, (
        f"expected high compat (>0.5), got {top['compatibility_score']}"
    )
    print("\nPASS: agent-to-agent matching round-trip verified.")


if __name__ == "__main__":
    main()
