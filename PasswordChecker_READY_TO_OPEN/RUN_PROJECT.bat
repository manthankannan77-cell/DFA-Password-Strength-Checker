```bat
@echo off
title DFA Password Strength Checker
cd /d "%~dp0"

echo ==========================================
echo   DFA PASSWORD STRENGTH CHECKER
echo ==========================================
echo.

python --version
if errorlevel 1 (
    echo Python was not found. Please install Python or fix PATH.
    pause
    exit /b 1
)

echo.
echo Starting the project...
echo Keep this window open while presenting.
echo.

python -m flask --version >nul 2>&1
if errorlevel 1 (
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo Dependency installation failed.
        pause
        exit /b 1
    )
)

start "" http://127.0.0.1:5000
python app.py

pause
```