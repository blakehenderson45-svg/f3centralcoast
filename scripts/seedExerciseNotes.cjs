const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

dotenv.config();

const firebaseConfig = require('../firebase-applet-config.json');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY is missing from environment!');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

// Parse exercises from src/data.ts
const dataContent = fs.readFileSync(path.join(__dirname, '../src/data.ts'), 'utf8');

function extractArray(regex) {
  const match = dataContent.match(regex);
  if (!match) return [];
  return (match[1].match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, ''));
}

const warmup = extractArray(/warmup:\s*\[([\s\S]*?)\]/);
const thang = extractArray(/thang:\s*\[([\s\S]*?)\]/);
const mary = extractArray(/mary:\s*\[([\s\S]*?)\]/);

const exerciseMap = new Map();

warmup.forEach(name => {
  if (!exerciseMap.has(name)) exerciseMap.set(name, { name, category: 'warmup' });
});
thang.forEach(name => {
  if (!exerciseMap.has(name)) exerciseMap.set(name, { name, category: 'thang' });
});
mary.forEach(name => {
  if (!exerciseMap.has(name)) exerciseMap.set(name, { name, category: 'mary' });
});

const allExercises = Array.from(exerciseMap.values());
console.log(`Found ${allExercises.length} unique exercises to process.`);

// Existing descriptions to avoid re-prompting if high quality, or prompt Gemini
let existingMap = {};
try {
  const existingContent = fs.readFileSync(path.join(__dirname, '../src/exerciseDescriptions.ts'), 'utf8');
  const lines = existingContent.split('\n');
  for (const line of lines) {
    const m = line.match(/^\s*"([^"]+)":\s*"([^"]+)",?/);
    if (m) {
      existingMap[m[1]] = m[2];
    }
  }
} catch (e) {
  console.warn('Could not read existing exercise descriptions:', e.message);
}

function cleanId(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
}

async function fetchAiDescription(name) {
  try {
    const prompt = `Describe the F3 exercise "${name}". How is it performed? Focus purely on the bodily movements required. Keep it strictly concise, 1-2 sentences. No fluff.`;
    const resp = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const text = (resp.text || '').trim();
    if (text) return text;
  } catch (err) {
    console.warn(`[AI Warning] Error generating for "${name}":`, err.message);
  }
  return existingMap[name] || `Standard F3 cadence execution for ${name}. Maintain core engagement and steady rhythm.`;
}

async function run() {
  const results = {};
  const batchSize = 6;
  
  for (let i = 0; i < allExercises.length; i += batchSize) {
    const chunk = allExercises.slice(i, i + batchSize);
    console.log(`Processing exercises ${i + 1} to ${Math.min(i + batchSize, allExercises.length)} of ${allExercises.length}...`);

    await Promise.all(
      chunk.map(async ({ name, category }) => {
        const id = cleanId(name);
        let description = '';

        // Fetch AI description
        console.log(`  -> Fetching AI description for: ${name}`);
        description = await fetchAiDescription(name);

        results[id] = {
          exerciseName: name,
          note: description,
          category,
          updatedAt: new Date().toISOString()
        };

        // Save to Firestore in cloud storage
        try {
          await setDoc(doc(db, 'exerciseNotes', id), {
            exerciseName: name,
            note: description,
            category,
            updatedAt: new Date().toISOString()
          });
          console.log(`  ✓ Cloud saved: ${name}`);
        } catch (saveErr) {
          console.error(`  ✗ Cloud save failed for ${name}:`, saveErr.message);
        }
      })
    );

    // Short pause between batches to prevent rate limiting
    if (i + batchSize < allExercises.length) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  // Save the full seed collection to src/savedExerciseNotes.json as baseline
  const outputPath = path.join(__dirname, '../src/savedExerciseNotes.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nAll done! Successfully saved ${Object.keys(results).length} exercise notes to cloud storage and ${outputPath}`);
}

run().catch(err => {
  console.error('Fatal error during seed execution:', err);
  process.exit(1);
});
