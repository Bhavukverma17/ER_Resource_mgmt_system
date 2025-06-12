// controllers/engineerController.js
const Projects = require("../models/Projects");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find(); // Fetch all records
    res.status(200).json(projects);
  } catch (error) {
    console.error("❌ Error fetching engineers:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProjects,
};
