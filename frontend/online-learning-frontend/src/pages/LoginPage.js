import React from "react";
import Login from "../components/Auth/Login";

const LoginPage = () => {
  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    alert("Login successful!");
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
