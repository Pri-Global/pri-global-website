/**
 * One-time / maintenance: convert .mov assets to H.264 MP4 for Chrome & Firefox.
 * Run: node scripts/convert-videos.mjs [--hero-only | --all]
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const videosDir = path.join(__dirname, "../public/videos");

const MOV_FILES = [
  "PRI-Branding-Video_4.13.20-480p.mov",
  "Doing-Business-With-PRI.mov",
  "PRI_Office-Tour_100-mb.mov",
  "PRIs-Competitive-Recruiting_updated.mov",
];

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: "inherit" });
    proc.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`))));
    proc.on("error", reject);
  });
}

async function convertFullMov(filename) {
  const input = path.join(videosDir, filename);
  const output = path.join(videosDir, filename.replace(/\.mov$/i, ".mp4"));
  if (!fs.existsSync(input)) {
    console.warn(`Skip (missing): ${filename}`);
    return;
  }
  if (fs.existsSync(output)) {
    console.log(`Exists: ${path.basename(output)}`);
    return;
  }
  console.log(`Converting ${filename} → ${path.basename(output)}`);
  await runFfmpeg([
    "-y",
    "-i", input,
    "-c:v", "libx264",
    "-profile:v", "main",
    "-pix_fmt", "yuv420p",
    "-crf", "23",
    "-preset", "medium",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    output,
  ]);
}

async function convertHeroClip() {
  const input = path.join(videosDir, "PRI-Branding-Video_4.13.20-480p.mov");
  const output = path.join(videosDir, "PRI-Branding-hero.mp4");
  if (!fs.existsSync(input)) {
    console.warn("Hero source .mov missing — skip hero clip");
    return;
  }
  if (fs.existsSync(output)) {
    console.log("Exists: PRI-Branding-hero.mp4");
    return;
  }
  console.log("Converting 20s hero clip → PRI-Branding-hero.mp4");
  await runFfmpeg([
    "-y",
    "-i", input,
    "-t", "20",
    "-an",
    "-c:v", "libx264",
    "-profile:v", "main",
    "-pix_fmt", "yuv420p",
    "-crf", "26",
    "-preset", "fast",
    "-movflags", "+faststart",
    output,
  ]);
}

const mode = process.argv[2] || "--hero-only";

if (mode === "--all") {
  await convertHeroClip();
  for (const file of MOV_FILES) await convertFullMov(file);
} else {
  await convertHeroClip();
}

console.log("Done.");
