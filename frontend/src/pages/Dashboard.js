import React, { useEffect, useState } from "react";
import axios from "axios";
import AssignProjectModal from "../modals/AssignProjectModal";
import AssignmentModal from "../modals/AssignmentModal";
import UnassignProjectModal from "../modals/UnassignProjectModal";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Header from "../components/Header";
import { API_BASE_URL } from "../config/api";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [engineers, setEngineers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const [assignModalState, setAssignModalState] = useState(false);
  const [assignmentModalState, setAssignmentModalState] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);

  const [filterProjectNone, setFilterProjectNone] = useState(false);

  const [filterCurrentlyNotAssigned, setFilterCurrentlyNotAssigned] =
    useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/engineers`);
        setEngineers(res.data);

        // If engineer, fetch own data
        if (currentUser?.role === "Engineer") {
          const currentEngineer = res.data.find(
            (eng) => eng.email === currentUser.email
          );

          if (currentEngineer?.project_assigned) {
            setProjectDetails(currentEngineer.project_assigned);
            const team = res.data.filter(
              (eng) =>
                eng.project_assigned === currentEngineer.project_assigned &&
                eng.email !== currentUser.email
            );
            setTeamMembers(team);
          }

          // Fetch Assignments
          const assignRes = await axios.get(
            `${API_BASE_URL}/api/assignments/by-engineer/${currentEngineer._id}`
          );
          setAssignments(assignRes.data);
        }
      } catch (error) {
        console.error("Error fetching engineer data:", error);
      }
    };

    fetchEngineers();
  }, [currentUser?.email, currentUser?.role]);

  // For Manager: Get domains
  const getAllDomains = () => {
    const uniqueDomains = new Set(engineers.map((eng) => eng.domain));
    return Array.from(uniqueDomains);
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [showSave, setShowSave] = useState(false);
  const filteredEngineers = engineers.filter((eng) => {
    let isMatch = true;
    if (filterProjectNone && eng.project_assigned) isMatch = false;
    if (filterCurrentlyNotAssigned && eng.currently_assigned) isMatch = false;
    if (selectedDomain && eng.domain !== selectedDomain) isMatch = false;
    return isMatch;
  });

  const handleStatusSave = async (assignmentId, status, hideSave) => {
    const statusMap = {
      "Started Overview": {
        current_status: "Started Overview",
        percent_completed: 25,
      },
      "Partially Completed": {
        current_status: "Partially Completed",
        percent_completed: 50,
      },
      Done: { current_status: "Done", percent_completed: 100 },
    };

    try {
      await axios.put(`${API_BASE_URL}/api/assignments/${assignmentId}`, {
        ...statusMap[status],
      });

      // Update local state after successful save
      setAssignments((prev) =>
        prev.map((a) =>
          a._id === assignmentId ? { ...a, ...statusMap[status] } : a
        )
      );

      hideSave(false); // hide Save button again
    } catch (err) {
      console.error("Error saving assignment update:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h2>Welcome, {currentUser?.email}</h2>
          <p className="role">Role: {currentUser?.role}</p>
        </div>

        {/* MANAGER VIEW */}
        {currentUser?.role === "Manager" && (
          <>
            <Link to="/manager-stats" className="stats-link">
              📊 View Statistics Dashboard
            </Link>

            <div className="filters">
              <label>
                <input
                  type="checkbox"
                  checked={filterProjectNone}
                  onChange={() => setFilterProjectNone((prev) => !prev)}
                />
                <strong>Project Assigned:</strong> None
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={filterCurrentlyNotAssigned}
                  onChange={() =>
                    setFilterCurrentlyNotAssigned((prev) => !prev)
                  }
                />
                <strong>Currently Assigned:</strong> No
              </label>

              <label>
                <strong>Domain:</strong>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="">All Domains</option>
                  {getAllDomains().map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="engineer-cards">
              {filteredEngineers.map((engineer) => (
                <div key={engineer._id} className="card">
                  <h4>{engineer.name}</h4>
                  <p>
                    <strong>Email:</strong> {engineer.email}
                  </p>
                  <p>
                    <strong>Domain:</strong> {engineer.domain}
                  </p>
                  <p>
                    <strong>Project Assigned:</strong>{" "}
                    {engineer.project_assigned || "None"}
                  </p>
                  <p>
                    <strong>Currently Assigned:</strong>{" "}
                    {engineer.currently_assigned ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Hours Allocated:</strong> {engineer.hours_allocated}
                  </p>
                </div>
              ))}
            </div>

            <div className="actions">
              <button onClick={() => setAssignModalState(true)}>
                🎯 Assign Projects
              </button>
              <button onClick={() => setAssignmentModalState(true)}>
                📋 Assign Assignment
              </button>
              <button onClick={() => setShowUnassignModal(true)}>
                🔄 Unassign Project
              </button>
            </div>
          </>
        )}

        {/* ENGINEER VIEW */}
        {currentUser?.role === "Engineer" && (
          <>
            {/* Project Info */}
            <div className="section">
              <h3 className="section-title">Your Assigned Project</h3>
              {projectDetails ? (
                <p>{projectDetails}</p>
              ) : (
                <p style={{ color: "gray" }}>No project assigned</p>
              )}
            </div>

            <div className="section">
              <h3 className="section-title">Your Team</h3>
              {teamMembers.length > 0 ? (
                <ul>
                  {teamMembers.map((teammate) => (
                    <li key={teammate._id}>
                      {teammate.name} ({teammate.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "gray" }}>No teammates found</p>
              )}
            </div>

            <div className="section">
              <h3 className="section-title">Your Assignments</h3>
              {assignments.length > 0 ? (
                <ul>
                  {assignments.map((assn) => {
                    return (
                      <li key={assn._id} style={{ marginBottom: "1.5rem" }}>
                        <strong>{assn.assignment_name}</strong> –{" "}
                        {assn.current_status} ({assn.percent_completed || 0}%
                        complete)
                        <br />
                        <em>{assn.remarks}</em>
                        <br />
                        <label htmlFor={`status-${assn._id}`}>
                          Update Status:{" "}
                        </label>
                        <select
                          id={`status-${assn._id}`}
                          value={selectedStatus}
                          onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setShowSave(true);
                          }}
                        >
                          <option value="">--Select--</option>
                          <option value="Started Overview">
                            Started Overview
                          </option>
                          <option value="Partially Completed">
                            Partially Completed
                          </option>
                          <option value="Done">Done</option>
                        </select>
                        {showSave && (
                          <button
                            style={{ marginLeft: "0.5rem" }}
                            onClick={() =>
                              handleStatusSave(
                                assn._id,
                                selectedStatus,
                                setShowSave
                              )
                            }
                          >
                            Save
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p style={{ color: "gray" }}>No assignments assigned yet</p>
              )}
            </div>
          </>
        )}

        {/* Modals */}
        {showUnassignModal && (
          <UnassignProjectModal onClose={() => setShowUnassignModal(false)} />
        )}
        {assignModalState && (
          <AssignProjectModal onClose={() => setAssignModalState(false)} />
        )}
        {assignmentModalState && (
          <AssignmentModal onClose={() => setAssignmentModalState(false)} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
