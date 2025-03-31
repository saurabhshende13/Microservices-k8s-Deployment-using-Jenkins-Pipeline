from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = ["Alice", "Bob", "Charlie"]

@app.route("/users", methods=["GET", "POST"])
def get_users():
    if request.method == "POST":
        data = request.get_json()
        if "name" in data:
            users.append(data["name"])
            return jsonify({"message": "User added successfully"}), 201
        return jsonify({"error": "Invalid data"}), 400
    return jsonify({"users": users})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

