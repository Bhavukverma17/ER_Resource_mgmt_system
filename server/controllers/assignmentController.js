// controllers/assignmentController.js
const Assignment = require('../models/Assignment');
const Engineer = require('../models/Engineers');

const createAssignmentAndAssignToEngineer = async (req, res) => {
  const { engineerId, assignment_name, current_status, percent_completed, remarks } = req.body;

  try {
    // 1. Create new assignment
    const assignment = new Assignment({
      assignment_name,
      current_status,
      percent_completed,
      remarks,
    });

    await assignment.save();

    // 2. Update engineer's assignment_ids list
    await Engineer.findByIdAndUpdate(engineerId, {
      $push: { assignment_ids: assignment._id },
    });

    res.status(201).json({ message: 'Assignment created and assigned to engineer', assignment });
  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAssignmentsByEngineer = async (req, res) => {
  const { engineerId } = req.params;

  try {
    const engineer = await Engineer.findById(engineerId).populate('assignment_ids');
    if (!engineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    res.status(200).json(engineer.assignment_ids); // These are actual Assignment documents
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createAssignmentAndAssignToEngineer,
  getAssignmentsByEngineer
};
