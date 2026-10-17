"""DFA/Moore-machine logic for the Password Strength Checker.

State bits are ordered (L, D, S):
L = password length is at least 8 characters
D = at least one digit has appeared
S = at least one special character has appeared

Each character updates the relevant flags. The resulting 3-bit state is one
of eight states q000 ... q111. Classification is the output associated with
the current state.
"""
import string

SPECIAL_CHARACTERS = set(string.punctuation)
MIN_LENGTH = 8

def state_id(length_ok: bool, has_digit: bool, has_special: bool) -> str:
    """Return the DFA state name for the current feature flags."""
    bits = f"{int(length_ok)}{int(has_digit)}{int(has_special)}"
    return f"q{bits}"

def classify(length_ok: bool, has_digit: bool, has_special: bool) -> str:
    """Return Weak, Medium, or Strong based on the DFA's current state."""
    if length_ok and has_digit and has_special:
        return "Strong"
    if length_ok and (has_digit or has_special):
        return "Medium"
    return "Weak"

def analyze_password(password: str) -> dict:
    """Scan a password left-to-right and return features, state and trace."""
    has_digit = False
    has_special = False
    trace = []
    for index, char in enumerate(password, start=1):
        has_digit = has_digit or char.isdigit()
        has_special = has_special or char in SPECIAL_CHARACTERS
        length_ok = index >= MIN_LENGTH
        trace.append({
            "index": index,
            "character": char,
            "state": state_id(length_ok, has_digit, has_special),
            "length_ok": length_ok,
            "has_digit": has_digit,
            "has_special": has_special,
            "strength": classify(length_ok, has_digit, has_special),
        })

    length_ok = len(password) >= MIN_LENGTH
    return {
        "password_length": len(password),
        "length_ok": length_ok,
        "has_digit": has_digit,
        "has_special": has_special,
        "state": state_id(length_ok, has_digit, has_special),
        "strength": classify(length_ok, has_digit, has_special),
        "trace": trace,
        "checks": [
            {"label": "At least 8 characters", "passed": length_ok},
            {"label": "Contains a digit (0–9)", "passed": has_digit},
            {"label": "Contains a special character", "passed": has_special},
        ],
    }
