import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login submit handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve user email and password from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Check if the entered email and password match
    if (user.email === email && user.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div id="authContainer" className="ms-auto me-auto text-center">
      <h1>Welcome to Task Manager</h1>
      <p>Your ultimate task management tool</p>

      <div id="authFormContainer" className="ms-auto me-auto">
        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
