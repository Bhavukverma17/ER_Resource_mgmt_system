const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
  name: String,
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  email: String,
  currently_assigned: Boolean,
  project_assigned: String,
  domain: String,
  hours_allocated: Number,
  assignment_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  }]
});

module.exports = mongoose.model('Engineer', engineerSchema);
