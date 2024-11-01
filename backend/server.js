import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Enable cors
app.use(cors());

const PORT = process.env.PORT || 4000;

// api endpoint
app.use("/api/users", UserRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "MERN Blog App Server is working..." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
