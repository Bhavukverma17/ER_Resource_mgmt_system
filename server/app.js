// app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fetchDataRoutes = require("./routes/fetchDataRoutes");
// const projectRoutes = require('./routes/projectRoutes')
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

// Environment variables with fallbacks
const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://er-resource-mgmt-system-c9za.vercel.app";
const NODE_ENV = process.env.NODE_ENV || "production";

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    const allowedOrigins = [FRONTEND_URL, "http://localhost:3000"];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked request from:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));

// Additional headers middleware
app.use((req, res, next) => {
  // Log request details
  console.log("Request details:", {
    method: req.method,
    path: req.path,
    origin: req.headers.origin,
    headers: req.headers,
  });

  // Set CORS headers
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling preflight request");
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Environment:", NODE_ENV);
  console.log("Frontend URL:", FRONTEND_URL);
  next();
});

// Routes
app.use("/api", authRoutes);
app.use("/api", fetchDataRoutes);
// app.use('/api', projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/stats", require("./routes/statsRoutes"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    frontendUrl: FRONTEND_URL,
    cors: {
      allowedOrigins: [FRONTEND_URL, "http://localhost:3000"],
      credentials: true,
    },
  });
});

app.get("/", (req, res) => {
  res.send("MongoDB + Express App Running");
});

// 404 handler
app.use((req, res, next) => {
  console.log(`[404] Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    environment: NODE_ENV,
    origin: req.headers.origin,
  });

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token or no token provided",
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Unhandled promise rejection handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
  console.error("Environment:", NODE_ENV);
});

// Uncaught exception handler
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  console.error("Environment:", NODE_ENV);
  process.exit(1);
});

module.exports = app;
