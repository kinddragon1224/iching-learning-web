import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const assetsPath = path.join(root, "data/card_assets.json");
const cardsDir = path.join(root, "public/cards/custom");

const seed = JSON.parse(fs.readFileSync(assetsPath, "utf8"));
const items = { ...(seed.items || {}) };

if (!fs.existsSync(cardsDir)) {
  console.log("No public/cards/custom directory yet. Nothing to apply.");
  process.exit(0);
}

let applied = 0;
for (let id = 1; id <= 64; id++) {
  const filename = `${String(id).padStart(3, "0")}.png`;
  const abs = path.join(cardsDir, filename);
  if (fs.existsSync(abs)) {
    items[String(id)] = `/cards/custom/${filename}`;
    applied += 1;
  }
}

const next = { ...seed, items };
fs.writeFileSync(assetsPath, JSON.stringify(next, null, 2) + "\n", "utf8");
console.log(`Applied ${applied} card assets from public/cards/custom`);
