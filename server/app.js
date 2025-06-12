// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fetchDataRoutes = require('./routes/fetchDataRoutes');
// const projectRoutes = require('./routes/projectRoutes')
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', fetchDataRoutes);
// app.use('/api', projectRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/stats', require('./routes/statsRoutes'));


app.get('/', (req, res) => {
  res.send('MongoDB + Express App Running');
});

module.exports = app;
