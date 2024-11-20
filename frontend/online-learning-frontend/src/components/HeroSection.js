import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Online Learning Platform</h1>
        <p>Unlock your potential with expert-led courses and resources.</p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
          alt="Learning"
        />
      </div>
    </div>
  );
};

export default HeroSection;
