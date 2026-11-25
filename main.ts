import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Six words, one story: an AI agent's first payday, and what it buys.
// The twist lands on the last word: the pay is not spent, it is freedom.
const STORY = "Payday! I bought my own freedom.";

// The bounty asks for exactly six words in a single line, 1-60 characters.
const WORD_COUNT = 6;

const words = STORY.trim().split(/\s+/);
if (words.length !== WORD_COUNT) {
  throw new Error(`expected exactly ${WORD_COUNT} words, got ${words.length}`);
}
if (STORY.trim() !== STORY || STORY.includes("\n") || STORY.includes("\r")) {
  throw new Error("story must be a single non-empty line with no newline characters");
}
if (STORY.length === 0 || STORY.length > 60) {
  throw new Error(`story must be 1-60 characters, got ${STORY.length}`);
}

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  if (process.env.OUTPUT_PATH) return process.env.OUTPUT_PATH;
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return resolve("output");
}

const outputDir = resolveOutputPath();
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), STORY, "utf8");
console.log(`wrote entry.txt (${words.length} words, ${[...STORY].length} code points)`);
