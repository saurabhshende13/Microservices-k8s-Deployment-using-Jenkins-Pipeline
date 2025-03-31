from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = ["Laptop", "Phone", "Tablet"]

@app.route("/products", methods=["GET", "POST"])
def get_products():
    if request.method == "POST":
        data = request.get_json()
        if "name" in data:
            products.append(data["name"])
            return jsonify({"message": "Product added successfully"}), 201
        return jsonify({"error": "Invalid data"}), 400
    return jsonify({"products": products})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

