const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // email should be unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Manager', 'Engineer'],
    default: 'Engineer',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
