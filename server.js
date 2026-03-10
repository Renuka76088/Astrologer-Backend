// ================== ENV ==================
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// ================== CORE ==================
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ================== ROUTES ==================
import AstroRoutes from "./Routes/AstrologerRoutes.js";




// ================== APP ==================
const app = express();

// ================== PATH ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ================== 🔥 GLOBAL CORS (NEVER FAIL) ==================
app.use(
  cors({
    origin: true, // ✅ allow ALL origins (browser, localhost, live, any port)
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// ✅ Preflight – VERY IMPORTANT
// app.options("*", cors());

// ================== MIDDLEWARE ==================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ================== STATIC ==================
app.use("/certs", express.static(join(__dirname, "public/certs")));

// ================== ROUTES ==================
app.use("/api/astrologer", AstroRoutes);



// ================== DEFAULT ==================
app.get("/", (req, res) => {
  res.send("🚀 Astrologer API running successfully");
});

// ================== DB + SERVER ==================
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGOURL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("✅ DB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
