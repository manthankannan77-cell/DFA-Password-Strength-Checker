from flask import Flask, render_template, request, jsonify
from dfa_engine import analyze_password

app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

@app.post("/api/check")
def check_password():
    data = request.get_json(silent=True) or {}
    password = data.get("password", "")
    if not isinstance(password, str):
        return jsonify({"error": "Password must be text."}), 400
    return jsonify(analyze_password(password))

if __name__ == "__main__":
    app.run(debug=True)
