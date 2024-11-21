import React from "react";
import Login from "../components/Auth/Login";
import { toast } from "react-toastify"; // Import Toastify
import { useNavigate } from "react-router-dom"; // Import useNavigate

// import "../styles/Login.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    // console.log("Login successful, token:", token); // Debug log
    toast.success("Login successful! 🎉"); // Toast for success
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
