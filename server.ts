import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Load saved cloud descriptions
let savedNotes: Record<string, any> = {};
try {
  const notesPath = path.join(process.cwd(), 'src/savedExerciseNotes.json');
  if (fs.existsSync(notesPath)) {
    savedNotes = JSON.parse(fs.readFileSync(notesPath, 'utf8'));
  }
} catch (e) {
  console.warn("Could not load savedExerciseNotes.json:", e);
}

app.post("/api/exercise-description", (req, res) => {
  const { exerciseName } = req.body;
  if (!exerciseName) {
    return res.status(400).json({ error: "exerciseName is required" });
  }

  const cleanId = exerciseName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  const found = savedNotes[cleanId];
  if (found && found.note) {
    return res.json({ description: found.note });
  }

  res.json({ description: `Standard F3 cadence execution for ${exerciseName}. Focus on tight form and steady rhythm.` });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
