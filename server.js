import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = promisify(exec);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Endpoint: save text + run Python + return audio path
app.post("/speak", async (req, res) => {
  const text = req.body.text || "Hello, I am Ava.";
  const jsonPath = path.join(__dirname, "data.json");

  try {
    // 1️⃣ Save input to data.json
    fs.writeFileSync(jsonPath, JSON.stringify({ text }, null, 2));

    // 2️⃣ Run Python script
    await execPromise("python test.py");

    // 3️⃣ Respond with audio file path
    res.json({ success: true, audio: "/ava_voice.mp3" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve ava_voice.mp3 and other static files
app.use(express.static(__dirname));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
