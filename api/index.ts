import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { generateSitemap } from "../src/utils/sitemapGenerator";

dotenv.config();

const app = express();
app.use(express.json());

// Sitemap Route
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://www.zipintel-ai.com";
  res.header("Content-Type", "application/xml");
  res.send(generateSitemap(baseUrl));
});

// API Status Route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    aiMode: "DETERMINISTIC_LOCAL",
    timestamp: new Date().toISOString()
  });
});

// Route mapping for safety
const wrapRoute = (path: string, handler: any) => {
  app.post(path, handler);
  app.post(path.replace("/api", ""), handler);
};

const wrapGetRoute = (path: string, handler: any) => {
  app.get(path, handler);
  app.get(path.replace("/api", ""), handler);
};

// DETERMINISTIC LOCAL FALLBACKS FOR ALL PREVIOUS API ROUTES
// These are now handled client-side, but kept for legacy/redundancy safety 100% self-contained.

wrapRoute("/api/ai/standardize-address", (req: Request, res: Response) => {
  const { address } = req.body;
  res.json({ normalized: address || "Node Offline" });
});

wrapRoute("/api/ai/locality-insights", (req: Request, res: Response) => {
  const { locality } = req.body;
  res.json({ insight: `Localized infrastructure node verified at ${locality}. Deterministic local mode active.` });
});

wrapRoute("/api/postal/fetch-records", (req: Request, res: Response) => {
  res.json({ records: [] }); // Client handles this deterministic generation now
});

wrapGetRoute("/api/postal/live-india/:query", (req: Request, res: Response) => {
  res.json({ Status: "Deterministic_Local_Active", PostOffice: [] });
});

wrapGetRoute("/api/postal/live-global/:country/:zip", (req: Request, res: Response) => {
  res.json({ status: "Local_Mode", places: [] });
});

wrapRoute("/api/ai/calculate-distance", (req: Request, res: Response) => {
  res.json({
    distance: "N/A",
    estimate: "Local Calculation Required",
    insight: "Geospatial node in deterministic local mode.",
    verified: false
  });
});

export default app;
