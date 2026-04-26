"""
Shared MongoDB data loader for all Residue agents.

Provides helper functions to fetch user data, sessions, profiles,
and correlations from MongoDB so agents can include real data in
their ASI1-Mini prompts for contextual responses.

Usage:
    from mongo_loader import get_mongo_context, get_all_users_summary
"""

import os
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent.parent / ".env")

try:
    from pymongo import MongoClient, DESCENDING
except ImportError:
    MongoClient = None  # type: ignore
    DESCENDING = -1  # type: ignore

_client: Optional[Any] = None
DB_NAME = os.environ.get("MONGODB_DB", "residue")


def _get_client():
    global _client
    if _client is not None:
        return _client
    if MongoClient is None:
        return None
    uri = os.environ.get("MONGODB_URI", "")
    if not uri:
        return None
    try:
        _client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        _client.admin.command("ping")
        return _client
    except Exception:
        _client = None
        return None


def _db():
    c = _get_client()
    return c[DB_NAME] if c else None


def get_recent_sessions(user_id: Optional[str] = None, limit: int = 5) -> list[dict]:
    """Fetch recent session snapshots from sessions_ts."""
    db = _db()
    if db is None:
        return []
    try:
        query = {"user_id": user_id} if user_id else {}
        cursor = db["sessions_ts"].find(query).sort("timestamp", DESCENDING).limit(limit)
        results = []
        for doc in cursor:
            doc.pop("_id", None)
            if "timestamp" in doc and hasattr(doc["timestamp"], "isoformat"):
                doc["timestamp"] = doc["timestamp"].isoformat()
            results.append(doc)
        return results
    except Exception:
        return []


def get_user_profiles(user_id: Optional[str] = None) -> list[dict]:
    """Fetch acoustic profiles from the profiles collection."""
    db = _db()
    if db is None:
        return []
    try:
        query = {"userId": user_id} if user_id else {}
        cursor = db["profiles"].find(query)
        results = []
        for doc in cursor:
            doc.pop("_id", None)
            results.append(doc)
        return results
    except Exception:
        return []


def get_correlations(user_id: Optional[str] = None, limit: int = 5) -> list[dict]:
    """Fetch recent correlation data."""
    db = _db()
    if db is None:
        return []
    try:
        query = {"userId": user_id} if user_id else {}
        cursor = db["correlations"].find(query).sort("_id", DESCENDING).limit(limit)
        results = []
        for doc in cursor:
            doc.pop("_id", None)
            results.append(doc)
        return results
    except Exception:
        return []


def get_user_data(user_id: Optional[str] = None) -> list[dict]:
    """Fetch user_data documents (agent assignments, metadata)."""
    db = _db()
    if db is None:
        return []
    try:
        query = {"userId": user_id} if user_id else {}
        cursor = db["user_data"].find(query)
        results = []
        for doc in cursor:
            doc.pop("_id", None)
            results.append(doc)
        return results
    except Exception:
        return []


def get_all_users_summary() -> str:
    """Return a concise summary of all users and their data for agent context."""
    db = _db()
    if db is None:
        return "MongoDB not connected."
    try:
        users = list(db["users"].find({}, {"email": 1, "_id": 1, "agentId": 1}))
        profiles = list(db["profiles"].find({}))
        session_count = db["sessions_ts"].count_documents({})

        profile_map = {p["userId"]: p for p in profiles}

        lines = [f"Platform has {len(users)} registered users, {session_count} session snapshots, {len(profiles)} acoustic profiles."]

        for u in users[:10]:
            uid = u["_id"]
            email = u.get("email", "unknown")
            p = profile_map.get(uid)
            if p:
                eq = p.get("eqVector", [])
                db_range = p.get("optimalDbRange", [])
                studying = p.get("currentlyStudying", False)
                mode = p.get("currentMode", "unknown")
                state = p.get("lastState", "unknown")
                eq_str = ", ".join(f"{v:.2f}" for v in eq) if eq else "none"
                db_str = f"{db_range[0]:.0f}-{db_range[1]:.0f} dB" if len(db_range) == 2 else "unknown"
                lines.append(
                    f"- {email}: EQ=[{eq_str}], optimal dB={db_str}, "
                    f"studying={studying}, mode={mode}, state={state}"
                )
            else:
                lines.append(f"- {email}: no acoustic profile yet")

        return "\n".join(lines)
    except Exception as e:
        return f"Error loading user summary: {e}"


def get_mongo_context(user_id: Optional[str] = None) -> str:
    """
    Build a context string with real MongoDB data for an agent's ASI1-Mini prompt.
    If user_id is provided, focuses on that user; otherwise gives a platform overview.
    """
    parts = []

    if user_id:
        # User-specific context
        profiles = get_user_profiles(user_id)
        sessions = get_recent_sessions(user_id, limit=3)
        correlations = get_correlations(user_id, limit=3)

        if profiles:
            p = profiles[0]
            eq = p.get("eqVector", [])
            db_range = p.get("optimalDbRange", [])
            bands = ["Sub-bass", "Bass", "Low-mid", "Mid", "Upper-mid", "Presence", "Brilliance"]
            eq_detail = ", ".join(f"{bands[i]}={eq[i]:.2f}" for i in range(min(len(eq), len(bands)))) if eq else "none"
            parts.append(
                f"User's acoustic profile: {eq_detail}. "
                f"Optimal dB range: {db_range[0]:.0f}-{db_range[1]:.0f} dB. "
                f"Currently studying: {p.get('currentlyStudying', False)}. "
                f"Current mode: {p.get('currentMode', 'unknown')}. "
                f"Last cognitive state: {p.get('lastState', 'unknown')}."
            )

        if sessions:
            latest = sessions[0]
            af = latest.get("acoustic_features", {})
            parts.append(
                f"Latest session: {af.get('overallDb', 0):.1f} dB, "
                f"productivity score: {latest.get('productivity_score', 0)}, "
                f"cognitive state: {latest.get('cognitive_state', 'unknown')}."
            )

        if correlations:
            c = correlations[0]
            ap = c.get("acousticProfile", {})
            parts.append(
                f"Latest correlation: {ap.get('overallDb', 0):.1f} dB overall, "
                f"productivity: {c.get('productivitySnapshot', {}).get('score', 0)}."
            )
    else:
        # Platform overview
        parts.append(get_all_users_summary())

        sessions = get_recent_sessions(limit=3)
        if sessions:
            latest = sessions[0]
            af = latest.get("acoustic_features", {})
            uid = latest.get("user_id", "unknown")
            parts.append(
                f"Most recent session ({uid}): {af.get('overallDb', 0):.1f} dB, "
                f"bands: {[b.get('magnitude', 0) for b in af.get('frequencyBands', [])]}."
            )

    return "\n\n".join(parts) if parts else "No data available in MongoDB yet."
