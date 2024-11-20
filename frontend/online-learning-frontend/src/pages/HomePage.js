import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import "../styles/HomePage.css";

const HomePage = () => {
  const isLoggedIn = false; // Replace this with actual logic to check user auth state

  return (
    <>
      <div className="home-page">
        {isLoggedIn ? (
          <header>
            <h1>Welcome back to Online Learning Platform</h1>
            <p>
              Continue exploring your enrolled courses or discover new ones!
            </p>
            <div className="home-buttons">
              <Link to="/dashboard" className="btn">
                Go to Dashboard
              </Link>
              <Link to="/courses" className="btn btn-secondary">
                Explore Courses
              </Link>
            </div>
          </header>
        ) : (
          <HeroSection />
        )}
      </div>
    </>
  );
};

export default HomePage;
