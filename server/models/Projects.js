// models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  domain: String,
  description: String,
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: Date,
  status: {
    type: String,
    enum: ['Active', 'Completed', 'On Hold'],
    default: 'Active',
  },
  total_hours: Number,
});

module.exports = mongoose.model('Project', projectSchema);
