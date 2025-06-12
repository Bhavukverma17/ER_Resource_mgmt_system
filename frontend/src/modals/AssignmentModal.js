import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { API_BASE_URL } from "../config/api";

const AssignmentModal = ({ onClose }) => {
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/engineers`);
        setEngineers(res.data);
      } catch (error) {
        console.error("Error fetching engineers:", error);
        setError("Failed to load engineers. Please try again.");
      }
    };

    fetchEngineers();
  }, []);

  const handleAssign = async () => {
    if (!selectedEngineer || !assignmentName.trim()) return;

    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/api/assignments/assign`, {
        engineerId: selectedEngineer,
        assignment_name: assignmentName,
      });
      alert("Assignment created and assigned!");
      onClose();
    } catch (error) {
      console.error("Assignment creation failed:", error);
      setError("Failed to create assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📝 Assign New Assignment</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          <div className="modal-form-group">
            <label className="modal-label">Select Engineer:</label>
            <select
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
              className="modal-select"
            >
              <option value="">Select Engineer</option>
              {engineers.map((eng) => (
                <option key={eng._id} value={eng._id}>
                  {eng.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-form-group">
            <label className="modal-label">Assignment Name:</label>
            <input
              type="text"
              placeholder="Enter assignment name..."
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              className="modal-input"
            />
          </div>

          {selectedEngineer && assignmentName.trim() && (
            <div className="modal-form-group">
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "var(--spacing-md)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--accent-light)",
                  fontSize: "0.875rem",
                }}
              >
                ✅ Ready to assign "{assignmentName}" to{" "}
                {engineers.find((eng) => eng._id === selectedEngineer)?.name}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-btn modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`modal-btn modal-btn-primary ${
              loading ? "loading" : ""
            }`}
            disabled={!selectedEngineer || !assignmentName.trim() || loading}
            onClick={handleAssign}
          >
            {loading ? "Assigning..." : "Create Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
