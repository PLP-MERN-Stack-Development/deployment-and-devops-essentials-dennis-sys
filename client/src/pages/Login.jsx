// client/src/pages/Login.jsx
import { useState, useContext, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./Login.css"; // 👈 Add CSS file

export default function Login() {
  const api = useApi();
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setToken(res.token);
      setUser(res.user);
      navigate("/home");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">

      {/* ⭐ Glowing Futuristic CDMS Title ⭐ */}
      <div className="cdms-title">
        <Typewriter
          options={{
            strings: ["CDMS"],
            autoStart: true,
            loop: true,
            delay: 60,
          }}
        />
      </div>

      {/* ⭐ Glass-card Login Form ⭐ */}
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
