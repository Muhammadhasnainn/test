import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import settingRoute from "./Routes/settings.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth/", authRoute);
app.use("/api/settings", settingRoute);

// Static/s
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), {
    function(err) {
      res.status(500).send(err);
    },
  });
});

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
};

Connect().then(() => {
  app.listen(PORT, () => {
    console.log("Example app running at", PORT);
  });
});
