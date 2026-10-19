 DFA Password Strength Checker

**Theory of Computation Project**

1. Project Overview

The DFA Password Strength Checker is a web-based application that evaluates password strength using a **Deterministic Finite Automaton (DFA)**.

The project demonstrates how concepts from Theory of Computation can be applied to a practical password-validation system. Users can enter a password and observe its evaluation through a web interface with a DFA state visualization.

 2. Objectives

- Implement a DFA-based password evaluation system.
- Understand states, transitions, and accepting states.
- Provide a simple and interactive user interface.
- Visualize DFA state transitions while entering a password.
- Test the DFA implementation using test cases.

 3. Technologies Used

- **Programming Language:** Python
- **Backend:** Flask
- **Frontend:** HTML, CSS, JavaScript
- **Concept:** Deterministic Finite Automaton (DFA)
- **Testing:** Python test cases
- **Version Control:** Git and GitHub

4. Project Structure

PasswordChecker_READY_TO_OPEN/
├── app.py
├── dfa_engine.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
├── static/
│   ├── app.js
│   └── style.css
├── tests/
│   └── test_dfa_engine.py
├── docs/
│   └── dfa-design.md
└── contributions/
    ├── member1_dfa.md
    ├── member2_ui.md
    ├── member3_tests.md
    └── member4_integration.md

 5. How to Install and Run

 Prerequisites

- Python 3 installed
- Git installed (if cloning the repository)
- A web browser

 Step 1: Clone the Repository
git clone https://github.com/manthankannan77-cell/DFA-Password-Strength-Checker.git

 Step 2: Open the Project Folder
cd DFA-Password-Strength-Checker/PasswordChecker_READY_TO_OPEN

If you already downloaded the project, open the `PasswordChecker_READY_TO_OPEN` folder in VS Code and open its terminal.

Step 3: Install Dependencies
python -m pip install -r requirements.txt

Step 4: Run the Application
python app.py

 Step 5: Open the Application

Open your browser and visit:
http://127.0.0.1:5000

Keep the terminal running while using the application.

 6. How the Application Works

1. The user enters a password in the web interface.
2. The frontend displays the input and updates the DFA visualization.
3. The backend uses the DFA engine to evaluate the password according to the implemented rules.
4. The DFA processes input symbols through state transitions.
5. The application displays the evaluation result.

7. DFA Concepts Used

- **States:** Represent the stages of processing the input.
- **Input Alphabet:** Represents the input symbols or character categories handled by the DFA.
- **Transition Function:** Determines the next state based on the current state and input.
- **Initial State:** The state where processing begins.
- **Accepting States:** States that represent inputs accepted by the DFA.

The detailed state design and transition rules are documented in `docs/dfa-design.md`.

 8. Testing

The project includes test cases for checking the DFA implementation.

To run the tests, install the project dependencies and execute:

python -m pytest tests/

Review the test output to confirm whether the tests pass. If `pytest` is not installed, install it using:
python -m pip install pytest

 9. Team Contributions

The project work is divided among four group members:

- **Member 1 – DFA Implementation:** DFA engine, state transitions, and DFA design documentation.
- **Member 2 – Frontend Development:** HTML, CSS, JavaScript, and the user interface.
- **Member 3 – Testing:** Test cases and verification of the DFA engine.
- **Member 4 – Integration and Documentation:** Application integration, README, and project documentation.

Individual contributions are documented in the `contributions/` directory. The actual work completed by each member should be explained during evaluation.

 10. Limitations

- The evaluation depends on the rules implemented in the DFA.
- A DFA-based password checker is an educational demonstration and is not a complete password-security auditing system.
- Password strength evaluation alone does not guarantee that a password is secure against every attack.

 11. Future Enhancements

- Add more password-validation rules.
- Improve the DFA visualization.
- Expand automated test coverage.
- Improve accessibility and user feedback.

 12. GitHub Repository

Repository: https://github.com/manthankannan77-cell/DFA-Password-Strength-Checker

This repository contains the project source code, setup instructions, tests, DFA design documentation, and team contribution documents.


Project: DFA Password Strength Checker  
Subject: Theory of Computation  
Submission: Group Project
