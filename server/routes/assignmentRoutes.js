const express = require('express');
const router = express.Router();
const {
  createAssignmentAndAssignToEngineer,
  getAssignmentsByEngineer
} = require('../controllers/assignmentController');

const Assignment = require('../models/Assignment');

// POST: Assign assignment to engineer
router.post('/assign', createAssignmentAndAssignToEngineer);

// GET: Get all assignments of an engineer
router.get('/by-engineer/:engineerId', getAssignmentsByEngineer);

// PUT /api/assignments/:id
router.put('/:id', async (req, res) => {
    try {
      const { current_status, percent_completed } = req.body;
  
      const updated = await Assignment.findByIdAndUpdate(
        req.params.id,
        { current_status, percent_completed },
        { new: true }
      );
  
    //   console.log(updated)
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Failed to update assignment", error: err });
    }
  });
  

module.exports = router;
