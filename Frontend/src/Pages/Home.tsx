import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";

const Home: React.FC = () => {
  return (
    <>
    <div className="text-center"id="homePageContainer">
      <h1>Welcome to Task Manager</h1>
      <p>Your ultimate task management tool</p>
      <div className="login-actions">
        <a href="/login" className="btn btn-dark">Login</a>
        <a href="/register" className="btn btn-primary">Register</a>
      </div>
    </div>

    </>
  );
};

export default Home;
