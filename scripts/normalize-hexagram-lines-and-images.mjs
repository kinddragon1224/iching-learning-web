import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "data/hexagram_content.json");
const cardIndexPath = path.join(root, "data/card_index.json");

// From Bagua (King Wen Unicode order mapping): binaryNum -> wenIndex
const BIN_TO_WEN = {
  0: 0, 1: 42, 2: 13, 3: 33, 4: 8, 5: 4, 6: 25, 7: 10,
  8: 9, 9: 57, 10: 37, 11: 53, 12: 60, 13: 59, 14: 40, 15: 18,
  16: 12, 17: 48, 18: 29, 19: 54, 20: 36, 21: 62, 22: 21, 23: 35,
  24: 24, 25: 16, 26: 20, 27: 50, 28: 41, 29: 2, 30: 26, 31: 23,
  32: 43, 33: 27, 34: 49, 35: 31, 36: 56, 37: 47, 38: 17, 39: 45,
  40: 5, 41: 46, 42: 63, 43: 39, 44: 58, 45: 28, 46: 3, 47: 6,
  48: 32, 49: 30, 50: 55, 51: 61, 52: 52, 53: 38, 54: 51, 55: 14,
  56: 11, 57: 44, 58: 34, 59: 15, 60: 19, 61: 7, 62: 22, 63: 1,
};

const WEN_TO_BIN = Object.fromEntries(Object.entries(BIN_TO_WEN).map(([bin, wen]) => [wen, Number(bin)]));

function kingWenLines(id) {
  const wenIndex = id - 1;
  const bin = WEN_TO_BIN[wenIndex];
  if (bin === undefined) throw new Error(`No binary mapping for hexagram id=${id}`);

  // In this mapping: 0 = yang(solid), 1 = yin(broken)
  // App convention: 1 = solid, 0 = broken
  // In this mapping ordering, bit5 behaves as bottom and bit0 as top.
  return Array.from({ length: 6 }, (_, i) => {
    const bit = (bin >> (5 - i)) & 1;
    return bit === 0 ? 1 : 0;
  });
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const normalized = content.map((item) => ({
  ...item,
  lines: kingWenLines(item.id),
  image: "/cards/placeholder.png",
}));
fs.writeFileSync(contentPath, JSON.stringify(normalized, null, 2) + "\n", "utf8");

const cardIndex = JSON.parse(fs.readFileSync(cardIndexPath, "utf8"));
const normalizedCards = cardIndex.map((item) => ({ ...item, card_image: "/cards/placeholder.png" }));
fs.writeFileSync(cardIndexPath, JSON.stringify(normalizedCards, null, 2) + "\n", "utf8");

console.log(`Updated ${normalized.length} hexagram_content entries with canonical lines + placeholder image`);
console.log(`Updated ${normalizedCards.length} card_index entries to placeholder image`);
