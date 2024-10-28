import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Enable cors
app.use(cors());

const PORT = process.env.PORT || 4000;

// api endpoint
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/test", (req, res) => {
  res.json({ message: "MERN Blog App Server is working..." });
});

// error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
