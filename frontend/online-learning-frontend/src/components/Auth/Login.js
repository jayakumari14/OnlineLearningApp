import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import Toastify

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      console.log("API Request Payload:", { email, password });
      console.log(
        "API URL:",
        `${process.env.REACT_APP_API_URL}/api/auth/login`
      );

      onLoginSuccess(response.data.token); // Pass token to parent
    } catch (error) {
      toast.error("Invalid email or password!"); // Toast for errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Disable input during loading
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disable input during loading
          />
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
