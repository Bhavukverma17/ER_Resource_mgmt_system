import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { API_BASE_URL } from "../config/api";

const AssignProjectModal = ({ onClose }) => {
  const [projects, setProjects] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`${API_BASE_URL}/api/projects`);
        setProjects(projectRes.data);

        const engineerRes = await axios.get(`${API_BASE_URL}/api/engineers`);
        const unassignedEngineers = engineerRes.data.filter(
          (eng) => !eng.project_assigned || eng.project_assigned === "None"
        );
        setEngineers(unassignedEngineers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleProjectSelect = (e) => {
    const project = projects.find((p) => p._id === e.target.value);
    setSelectedProject(project);
  };

  const handleEngineerSelect = (e) => {
    const engineer = engineers.find((eng) => eng._id === e.target.value);
    setSelectedEngineer(engineer);
  };

  const handleAssign = async () => {
    if (!selectedProject || !selectedEngineer) return;

    setLoading(true);
    setError("");

    try {
      await axios.put(`${API_BASE_URL}/api/assign/${selectedEngineer._id}`, {
        projectId: selectedProject._id,
      });

      alert("✅ Project assigned successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Failed to assign project:", error);
      setError("Error assigning project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📋 Assign Project</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}

          {/* Project Dropdown */}
          <div className="modal-form-group">
            <label className="modal-label">Choose Project:</label>
            <select
              onChange={handleProjectSelect}
              defaultValue=""
              className="modal-select"
            >
              <option value="" disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Engineer Dropdown */}
          <div className="modal-form-group">
            <label className="modal-label">Choose Engineer:</label>
            <select
              onChange={handleEngineerSelect}
              defaultValue=""
              className="modal-select"
            >
              <option value="" disabled>
                Select an engineer
              </option>
              {engineers.map((engineer) => (
                <option key={engineer._id} value={engineer._id}>
                  {engineer.name} ({engineer.email})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Project Details */}
          {selectedProject && (
            <div className="modal-form-group">
              <h3
                style={{
                  color: "var(--accent-light)",
                  marginBottom: "var(--spacing-md)",
                }}
              >
                Selected Project Details
              </h3>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "var(--spacing-lg)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--accent-light)",
                }}
              >
                <h4
                  style={{
                    color: "var(--success-color)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  {selectedProject.name}
                </h4>
                <p>
                  <strong>Domain:</strong> {selectedProject.domain}
                </p>
                <p>
                  <strong>Description:</strong> {selectedProject.description}
                </p>
                <p>
                  <strong>Status:</strong> {selectedProject.status}
                </p>
                <p>
                  <strong>Total Hours:</strong> {selectedProject.total_hours}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(selectedProject.start_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(selectedProject.end_date).toLocaleDateString()}
                </p>
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
            disabled={!selectedProject || !selectedEngineer || loading}
            onClick={handleAssign}
          >
            {loading ? "Assigning..." : "Assign Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignProjectModal;
