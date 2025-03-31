import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";  // Import the logo

const API_BASE_URL = "https://devildevops.live";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    fetch("${API_BASE_URL}/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));

    fetch("${API_BASE_URL}/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAddUser = async () => {
    if (newUser.trim() === "") return;
    const response = await fetch("${API_BASE_URL}/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newUser }),
    });
    if (response.ok) {
      setUsers([...users, newUser]);
      setNewUser("");
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.trim() === "") return;
    const response = await fetch("${API_BASE_URL}/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProduct }),
    });
    if (response.ok) {
      setProducts([...products, newProduct]);
      setNewProduct("");
    }
  };

  return (
    <div className="App">
      {/* Logo */}
      <img src={logo} alt="Microservices Logo" className="logo" />

      <h1>Microservices App</h1>

      <h2>Users</h2>
      <ul>{users.map((user, index) => <li key={index}>{user}</li>)}</ul>
      <button onClick={() => window.location.href = "https://devildevops.live/users"}>
        View Full User List
      </button>
      <div>
        <input 
          type="text" 
          placeholder="Enter new user" 
          value={newUser} 
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h2>Products</h2>
      <ul>{products.map((product, index) => <li key={index}>{product}</li>)}</ul>
      <button onClick={() => window.location.href = "https://devildevops.live/products"}>
        View Full Product List
      </button>
      <div>
        <input 
          type="text" 
          placeholder="Enter new product" 
          value={newProduct} 
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default App;

