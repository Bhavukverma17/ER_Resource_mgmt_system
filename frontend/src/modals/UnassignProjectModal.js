import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { API_BASE_URL } from "../config/api";

const UnassignProjectModal = ({ onClose }) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineerId, setSelectedEngineerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/engineers`);
        const filtered = res.data.filter((eng) => eng.project_assigned); // Only show engineers with projects
        setEngineers(filtered);
      } catch (err) {
        console.error("Error fetching engineers:", err);
        setError("Failed to load engineers. Please try again.");
      }
    };

    fetchEngineers();
  }, []);

  const handleUnassign = async () => {
    if (!selectedEngineerId) return;

    setLoading(true);
    setError("");

    try {
      await axios.put(`${API_BASE_URL}/api/unassign/${selectedEngineerId}`);
      alert("Project unassigned successfully!");
      onClose();
    } catch (err) {
      console.error("Error unassigning project:", err);
      setError("Failed to unassign project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🔄 Unassign Project</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          <div className="modal-form-group">
            <label className="modal-label">Select Engineer to Unassign:</label>
            <select
              value={selectedEngineerId}
              onChange={(e) => setSelectedEngineerId(e.target.value)}
              className="modal-select"
            >
              <option value="">Select Engineer</option>
              {engineers.map((eng) => (
                <option key={eng._id} value={eng._id}>
                  {eng.name} ({eng.email})
                </option>
              ))}
            </select>
          </div>

          {selectedEngineerId && (
            <div className="modal-form-group">
              <div
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "var(--spacing-md)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--accent-light)",
                  fontSize: "0.875rem",
                }}
              >
                ⚠️ This action will remove the project assignment from the
                selected engineer.
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`modal-btn ${loading ? "loading" : ""}`}
            onClick={handleUnassign}
            disabled={!selectedEngineerId || loading}
            style={{
              background:
                selectedEngineerId && !loading
                  ? "var(--error-color)"
                  : "var(--accent-muted)",
              color: "var(--accent-light)",
              border: "1px solid",
              borderColor:
                selectedEngineerId && !loading
                  ? "var(--error-color)"
                  : "var(--border-color)",
            }}
          >
            {loading ? "Unassigning..." : "Unassign Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnassignProjectModal;
