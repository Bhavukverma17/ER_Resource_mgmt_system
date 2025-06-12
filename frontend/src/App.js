import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Sample private page
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerStatsPage from "./pages/ManagerStatsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Listen for storage changes to update authentication status
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Check authentication status on mount
    setIsAuthenticated(!!localStorage.getItem("token"));

    // Listen for storage events (when localStorage is modified)
    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for when we manually update localStorage
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route always redirects to /login if not authenticated */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-stats"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ManagerStatsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
