import React from "react";
import Login from "../components/Auth/Login";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    alert("Login successful!");
    navigate("/dashboard"); // Redirect to dashboard
  };
  return (
    <>
      <div>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    </>
  );
};

export default LoginPage;
