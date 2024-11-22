import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to login page
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {user.username}!</h1>
          <p>“Learning never exhausts the mind.” – Leonardo da Vinci</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      {/* Dashboard Buttons */}
      <div className="dashboard-buttons">
        <Link to="/my-courses" className="dashboard-card">
          <div className="card-content">
            <img
              src="/images/my-courses-icon.svg"
              alt="My Courses"
              className="card-icon"
            />
            <h2>My Courses</h2>
            <p>View and continue your enrolled courses.</p>
          </div>
        </Link>

        <Link to="/courses" className="dashboard-card">
          <div className="card-content">
            <img
              src="/images/explore-courses-icon.svg"
              alt="Explore Courses"
              className="card-icon"
            />
            <h2>Explore More Courses</h2>
            <p>Find new courses to enhance your skills.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
