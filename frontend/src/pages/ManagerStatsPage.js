import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./ManagerStats.css";
import { API_BASE_URL } from "../config/api";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

const ManagerStatsPage = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/stats/overview`);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats)
    return (
      <>
        <Header />
        <div className="manager-stats-container">
          <p className="loading-text">📊 Loading statistics dashboard...</p>
        </div>
      </>
    );

  const pieData = [
    { name: "Assigned Engineers", value: stats.assignedEngineers },
    { name: "Unassigned Engineers", value: stats.unassignedEngineers },
  ];

  return (
    <>
      <Header />
      <div className="manager-stats-container">
        <div className="stats-header">
          <h2>📊 Manager Statistics Dashboard</h2>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ⬅ Back to Dashboard
          </button>
        </div>

        <div className="charts-section">
          <div className="chart-box">
            <h3>Engineer Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Engineers per Project</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.projectWiseEngineerCount}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="summary-section">
          <h4>🔢 Total Statistics Summary</h4>
          <ul>
            <li>
              Total Engineers: <strong>{stats.totalEngineers}</strong>
            </li>
            <li>
              Assigned Engineers: <strong>{stats.assignedEngineers}</strong>
            </li>
            <li>
              Unassigned Engineers: <strong>{stats.unassignedEngineers}</strong>
            </li>
            <li>
              Total Projects: <strong>{stats.totalProjects}</strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManagerStatsPage;
