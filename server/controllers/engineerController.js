// controllers/engineerController.js
const Engineer = require('../models/Engineers');
const Project = require("../models/Projects");

const getAllEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find(); // Fetch all records
    res.status(200).json(engineers);
  } catch (error) {
    console.error('❌ Error fetching engineers:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const assignProjectToEngineer = async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log(project);
    const updatedEngineer = await Engineer.findByIdAndUpdate(
      req.params.id,
      {
        project_assigned: project.name,
        currently_assigned: true,
      },
      { new: true }
    );

    if (!updatedEngineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    res.status(200).json({ message: 'Engineer updated successfully', engineer: updatedEngineer });
  } catch (err) {
    console.error('❌ Error assigning project:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const unassignProjectFromEngineer = async (req, res) => {
  try {
    const engineerId = req.params.id;

    const engineer = await Engineer.findById(engineerId);
    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    engineer.project_assigned = null;
    engineer.currently_assigned = false;
    await engineer.save();

    res.status(200).json({ message: "Project unassigned from engineer" });
  } catch (error) {
    console.error("❌ Error unassigning project:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllEngineers,
  assignProjectToEngineer,
  unassignProjectFromEngineer
};