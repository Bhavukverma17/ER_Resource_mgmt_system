// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const Engineer = require('../models/Engineers');
const Project = require('../models/Projects');

router.get('/overview', async (req, res) => {
  try {
    const totalEngineers = await Engineer.countDocuments();
    const assignedEngineers = await Engineer.countDocuments({ currently_assigned: true });
    const unassignedEngineers = totalEngineers - assignedEngineers;

    const totalProjects = await Project.countDocuments();
    
    const projectWiseEngineerCount = await Engineer.aggregate([
      { $match: { project_assigned: { $ne: null } } },
      { $group: { _id: "$project_assigned", count: { $sum: 1 } } },
    ]);

    res.json({
      totalEngineers,
      assignedEngineers,
      unassignedEngineers,
      totalProjects,
      projectWiseEngineerCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
