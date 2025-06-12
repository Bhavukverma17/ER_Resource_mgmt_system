// index.js
const app = require('./app');         // Express app
const connectDB = require('./config/db'); // MongoDB connection

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
