// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();
const app = express();

// CORS for frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://candid-manatee-da20d7.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
