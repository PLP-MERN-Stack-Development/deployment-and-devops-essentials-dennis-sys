// client/src/components/Header.jsx
import React, { useContext } from "react";
import Typewriter from "typewriter-effect";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + user
    navigate("/register", { replace: true }); // back to landing page
  };

  return (
    <header className="header-container" data-theme={theme}>
      <div className="header-title">
        <Typewriter
          options={{
            strings: ["CORPORATE DOCUMENT MANAGEMENT SYSTEM"],
            autoStart: true,
            loop: true,
            delay: 40,
          }}
        />
      </div>

      <div className="header-actions">
        {/* Theme Toggle */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Logout Button (only when authenticated) */}
        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
