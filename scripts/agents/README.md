# Residue Multi-Agent System

![tag:innovationlab](https://img.shields.io/badge/innovationlab-3D8BD3)

Residue's multi-agent system built with [Fetch.ai uAgents](https://github.com/fetchai/uAgents) and [ASI1-Mini](https://asi1.ai).

## Agents

| Agent | File | Port | Purpose |
|-------|------|------|---------|
| PerceptionAgent | `perception_agent.py` | 8770 | Cognitive state inference from acoustic + behavioral data |
| CorrelationAgent | `correlation_agent.py` | 8771 | Personal acoustic profile learning |
| InterventionAgent | `intervention_agent.py` | 8772 | Optimal acoustic intervention computation |
| OrchestratorAgent | `orchestrator_agent.py` | 8773 (uAgent) + 8765 (HTTP) | Pipeline coordination + HTTP API |
| Chat Agent | `residue_chat_agent.py` | 8780 | ASI:One compatible (Agentverse) |

## Quick Start

```bash
# From project root
cd scripts
pip install -r requirements.txt

# Run all agents
python agents/run_all.py

# Or run just the chat agent for Agentverse
python agents/residue_chat_agent.py
```

## Environment Variables

Set these in `.env` at the project root:

```bash
ASI1_API_KEY=your-asi1-mini-api-key      # Required — get at https://asi1.ai/dashboard/api-keys
MONGODB_URI=your-mongodb-connection       # Optional — for profile persistence
AGENTVERSE_API_KEY=your-agentverse-key    # Optional — for Agentverse registration
```

## HTTP API (Orchestrator)

When running `run_all.py`, the orchestrator exposes HTTP on port 8765:

### POST /orchestrate
Full pipeline: perception → correlation → intervention.

```json
{
  "session_id": "abc123",
  "user_id": "user1",
  "goal_mode": "focus",
  "acoustic": "{\"overall_db\": 55, \"frequency_bands\": [0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1]}",
  "behavioral": "{\"typing_speed\": 45, \"error_rate\": 3, \"inter_key_latency\": 120, \"mouse_jitter\": 5, \"scroll_velocity\": 100, \"focus_switch_rate\": 2}"
}
```

### POST /perceive
Cognitive state inference only.

### POST /correlate
Profile building from session history.

### POST /intervene
Acoustic intervention recommendation.

### POST /match
Find users with similar acoustic profiles via cross-agent matching.

```json
{
  "user_id": "user1",
  "top_k": 5
}
```

Response:

```json
{
  "user_id": "user1",
  "top_k": 5,
  "source": "agent",
  "matches": [
    {
      "user_id": "user42",
      "compatibility_score": 0.87,
      "eq_similarity": 0.92,
      "db_overlap": 0.7,
      "sound_overlap": 0.5,
      "shared_sounds": ["brown noise", "rain"],
      "shared_bands": ["Low-mid", "Mid"],
      "agent_address": "agent1q...",
      "vector_score": 0.96,
      "reasoning": "You both prefer low-mid 200-500Hz at ~50dB...",
      "candidate_profile": { "...": "..." }
    }
  ]
}
```

### GET /health
Agent system status.

## Cross-Agent Matching

The CorrelationAgent persists each user's acoustic profile to MongoDB and
exposes typed agent-to-agent messages (`FindMatchesRequest`,
`ProfileExchangeRequest`) so CorrelationAgents representing different
users can discover and confirm compatibility with one another.

Flow:

1. Client POSTs to `/match` on the orchestrator with `{user_id, top_k}`.
2. Orchestrator dispatches a `FindMatchesRequest` to the
   CorrelationAgent (and runs an in-process synchronous fallback).
3. CorrelationAgent A loads its user's profile from MongoDB and runs
   Atlas Vector Search on the `eq_gains` field to find the top-K most
   similar profiles. If Atlas Vector Search isn't configured, it falls
   back to a Python-side cosine similarity scan over the collection.
4. For each candidate, A computes full compatibility (EQ cosine
   similarity, dB-range overlap, shared sounds) and asks ASI1-Mini for a
   natural-language match reasoning.
5. For each candidate that has a registered `agent_address`, A also
   sends a `ProfileExchangeRequest` to the candidate's CorrelationAgent.
   The peer responds with its own profile and compatibility scores —
   bidirectional confirmation that doesn't block the response.
6. Orchestrator returns the ranked matches via `/match`.

### MongoDB

Collection: `residue.acoustic_profiles` (one document per `user_id`).

```json
{
  "user_id": "user1",
  "optimal_db": 48,
  "db_range": [42, 55],
  "eq_gains": [0.3, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1],
  "preferred_bands": ["Low-mid", "Mid"],
  "preferred_sounds": ["brown noise", "rain"],
  "confidence": 0.85,
  "data_points": 42,
  "agent_address": "agent1q...",
  "study_hours": "9am-5pm",
  "focus_score_avg": 72,
  "location": "UCLA Campus",
  "updated_at": "2025-04-01T12:00:00Z"
}
```

Indexes:

- Unique `user_id`
- Standard `agent_address`, `updated_at`
- Atlas Vector Search index on `eq_gains` (7 dims, cosine):
  `acoustic_profile_vector_index`

Run `python scripts/setup_mongo_indexes.py` to create the regular
indexes and (where supported) the Atlas Vector Search index. On Atlas
tiers that don't allow programmatic search-index creation, the script
prints the JSON definition for manual creation in the Atlas UI.

## Agentverse Registration

The `residue_chat_agent.py` implements the Fetch.ai Chat Protocol, making it discoverable via ASI:One:

1. Run: `python agents/residue_chat_agent.py`
2. Go to [agentverse.ai](https://agentverse.ai) and sign in
3. Create a mailbox for the agent
4. Your agent is now discoverable via ASI:One chat

## Architecture

Each agent uses ASI1-Mini for reasoning rather than hardcoded rules. The perception agent infers cognitive state from raw sensor data, the correlation agent generates insights about your acoustic preferences, and the intervention agent reasons about which soundscape best achieves your goal.
