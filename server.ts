import express, { Request, Response } from "express";
import path from "path";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini with safety checks
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "missing-key") {
    console.warn("GEMINI_API_KEY is not set or invalid. AI features will be limited.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const ai = getAIClient();

// Simple in-memory cache to reduce AI quota consumption
const aiCache = new Map<string, any>();

// Helper for structured AI errors
const handleAIError = (error: any, res: Response, fallbackValue: any = null) => {
  const errText = error.message || String(error);
  console.error("AI Error Details:", errText);

  if (errText.includes("403") || errText.includes("PERMISSION_DENIED")) {
    return res.status(403).json({ 
      error: "API_KEY_INVALID",
      message: "Please check your Gemini API key in Settings > Secrets.",
      fallback: fallbackValue 
    });
  }

  if (errText.includes("429") || errText.includes("RESOURCE_EXHAUSTED")) {
    return res.status(429).json({ 
      error: "QUOTA_EXCEEDED",
      message: "AI quota exceeded. Using static indexed records.",
      fallback: fallbackValue 
    });
  }

  res.status(500).json({ 
    error: "AI_SERVICE_ERROR",
    message: "The AI service encountered an unstable connection.",
    details: errText 
  });
};

// API Routes
app.post("/api/ai/standardize-address", async (req: Request, res: Response) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: "Address is required" });

  if (!ai) {
    return res.status(403).json({ error: "Missing API Key", message: "Connect your Gemini API key in Settings." });
  }

  const cacheKey = `standardize:${address}`;
  if (aiCache.has(cacheKey)) return res.json({ normalized: aiCache.get(cacheKey) });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Standardize the following address into a clean, properly formatted global address with the correct postal code. Return ONLY the standard address text.\n\nAddress: ${address}`,
    });

    const normalized = result.text || address;
    aiCache.set(cacheKey, normalized);
    res.json({ normalized });
  } catch (error: any) {
    handleAIError(error, res, address);
  }
});

app.post("/api/ai/locality-insights", async (req: Request, res: Response) => {
  const { locality, context } = req.body;
  if (!locality) return res.status(400).json({ error: "Locality is required" });

  if (!ai) {
    return res.status(403).json({ error: "Missing API Key" });
  }

  const cacheKey = `insight:${locality}:${context}`;
  if (aiCache.has(cacheKey)) return res.json({ insight: aiCache.get(cacheKey) });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Provide a brief 2-line summary of the locality "${locality}" in the context of ${context}. Include general vibe, landmarks, or geographic traits. Return ONLY the 2-line summary.`,
    });

    const insight = result.text || "No insights available.";
    aiCache.set(cacheKey, insight);
    res.json({ insight });
  } catch (error: any) {
    handleAIError(error, res, "No insights available.");
  }
});

app.post("/api/postal/fetch-records", async (req: Request, res: Response) => {
  try {
    const { parentId, countryId, level } = req.body;
    
    if (!ai) return res.json({ records: [] });

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Generate a list of 5 real sub-localities (like districts, cities, or neighborhoods) for the region "${parentId}" in ${countryId} at level ${level}. 
      If level is 3, return villages or areas. If level 1, return provinces or states.
      Return the data in a valid JSON array format: [{"id": "string", "name": "string", "type": "string", "postalCode": "string(optional)"}].
      Only return the JSON.`,
    });

    try {
      const text = result.text?.replace(/```json|```/g, "").trim() || "[]";
      const records = JSON.parse(text);
      res.json({ records: Array.isArray(records) ? records : [] });
    } catch (e) {
      res.json({ records: [] });
    }
  } catch (error: any) {
    handleAIError(error, res, []);
  }
});

app.get("/api/postal/live-india/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const isPincode = /^\d+$/.test(query);
    const url = isPincode 
      ? `https://api.postalpincode.in/pincode/${query}` 
      : `https://api.postalpincode.in/postoffice/${query}`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/postal/live-global/:country/:zip", async (req, res) => {
  try {
    const { country, zip } = req.params;
    const response = await fetch(`https://api.zippopotam.us/${country}/${zip}`);
    if (!response.ok) throw new Error("Not found");
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// Vite middleware and Server start
async function startApp() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startApp();
