import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would typically send the data to the server
    // After successful registration, navigate to the Login page
    localStorage.setItem("user", JSON.stringify({ email, password }));

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div id="authContainer" className="ms-auto me-auto text-center">
      <h1>Welcome to Task Manager</h1>
      <p>Your ultimate task management tool</p>

      <div id="authFormContainer" className="ms-auto me-auto">
        <form onSubmit={handleRegister}>
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

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Confirm Password</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>

      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
