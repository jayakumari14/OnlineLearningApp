const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
dotenv.config(); // Loads environment variables from .env file

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
console.log(process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-domain.com"]
    : ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins, // Add other origins for production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images, CSS, JS)
// app.use("/images", express.static(path.join(__dirname, "images")));
// Serve the React app's build folder
// app.use(express.static(path.join(__dirname, "frontend/build")));

// Routes
app.use("/api/auth", authRoutes); //user routes
app.use("/api/courses", courseRoutes); // course routes

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

//   console.log("Server environment:", process.env.NODE_ENV || "development");

// Basic route for testing
app.get("/", (req, res) => {
  res.send("onlineLearning App Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
