import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch custom event to notify App component about auth change
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/manager-stats">View Stats</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
