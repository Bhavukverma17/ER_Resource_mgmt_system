// components/Header.js
import React from "react";
import "./Header.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    // Dispatch custom event to trigger auth state update
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img
          src={`${process.env.PUBLIC_URL}/app_logo_dark.png`}
          alt="logo"
          className="header-logo"
        />
        <div className="header-title">
          <h1>Engineering Resources</h1>
          <span className="header-subtitle">Management Dashboard</span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-profile">
          <FaUserCircle size={32} />
          <div className="user-info">
            <span className="user-email">{currentUser?.email}</span>
            <span className="user-role">{currentUser?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <FaSignOutAlt size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
