"""Pytest config: ensure scripts/ is on sys.path so we can import agents.*."""
import sys
from pathlib import Path

_AGENTS_DIR = Path(__file__).resolve().parent.parent
_SCRIPTS_DIR = _AGENTS_DIR.parent
if str(_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS_DIR))
