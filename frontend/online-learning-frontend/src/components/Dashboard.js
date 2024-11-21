import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      <p>Your email: {user.email}</p>
      <div className="dashboard-actions">
        <button className="btn">My Courses</button>
        <button className="btn">Explore More Courses</button>
      </div>
    </div>
  );
};

export default Dashboard;
