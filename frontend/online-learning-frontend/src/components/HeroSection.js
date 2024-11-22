import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
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
          <img src="/images/hero-section.avif" alt="Learning" />

          <footer
            style={{
              backgroundColor: "#f1f1f1",
              padding: "20px 0",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Created by <strong>Jaya</strong> |{" "}
              <a href="mailto:jaya127@gmail.com" style={{ color: "#0066cc" }}>
                kumarijaya127@gmail.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
