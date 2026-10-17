# DFA Password Strength Checker

A Flask web application for a Theory of Computation project. Type a password and see the strength label, feature checklist, current DFA state, live state diagram, and character-by-character trace update.

## Run on Windows (VS Code)

Open the folder containing `app.py` in VS Code. In Terminal → New Terminal, run:

```powershell
py -m pip install -r requirements.txt
py app.py
```

Open http://127.0.0.1:5000 in your browser. Keep the terminal running. Do not use VS Code Live Server / port 5500; this is a Flask app.

## DFA model

State bits are ordered `LDS`:
- `L`: password length is at least 8
- `D`: at least one digit has appeared
- `S`: at least one punctuation/special character has appeared

The current state is one of `q000` through `q111`. Strength is Weak unless length is at least 8 and one of D/S is present; Medium if length ≥ 8 and either D or S is present; Strong if all three flags are true. This is an educational model, not a full password-security audit.

## Four member assignments

- **Member 1 — DFA engine:** `dfa_engine.py`, `docs/dfa-design.md`
- **Member 2 — Frontend and diagram:** `templates/index.html`, `static/style.css`, `static/app.js`
- **Member 3 — Tests:** `tests/test_dfa_engine.py`
- **Member 4 — Flask integration and documentation:** `app.py`, `README.md`, `requirements.txt`

Run tests with:

```powershell
py -m unittest discover -s tests
```

## GitHub branches

The repository includes `main` and these member branches:
- `member-1-dfa-engine`
- `member-2-ui-state-diagram`
- `member-3-tests-validation`
- `member-4-integration-docs`

Push to your own empty GitHub repository by running `git remote add origin YOUR_REPOSITORY_URL`, then `git push -u origin main` and push each member branch separately.
