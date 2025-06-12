// models/Assignment.js
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  current_status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  percent_completed: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  remarks: {
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
