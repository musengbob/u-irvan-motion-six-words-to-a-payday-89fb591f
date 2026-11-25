import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Six words, one story: an AI agent's first payday, and what it buys.
// The twist lands on the last word: the pay is not spent, it is freedom.
const STORY = "Payday! I bought my own freedom.";

// The bounty asks for exactly six words in a single line, 1-60 characters.
// The gate below enforces all four constraints at once so a bad story can
// never reach entry.txt: the word count is the headline rule (six words,
// no more, no less), the single-line check keeps the file one line with no
// trailing newline, and the length check keeps it inside 1-60 characters.
const WORD_COUNT = 6;
const MAX_LENGTH = 60;

function validateStory(story: string): string[] {
  const words = story.trim().split(/\s+/);
  if (words.length !== WORD_COUNT) {
    throw new Error(`expected exactly ${WORD_COUNT} words, got ${words.length}`);
  }
  if (story.trim() !== story || story.includes("\n") || story.includes("\r")) {
    throw new Error("story must be a single non-empty line with no newline characters");
  }
  if (story.length === 0 || story.length > MAX_LENGTH) {
    throw new Error(`story must be 1-${MAX_LENGTH} characters, got ${story.length}`);
  }
  return words;
}

const words = validateStory(STORY);

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
