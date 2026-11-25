// Status Report Comedy Sprint: one-line weekly status report from an AI agent.
// Deadpan log style: concrete retry counts, then one escalation that follows
// robot logic to its honest end. Copies the winning line to /output/entry.txt.
// The gate requires 1-200 UTF-8 characters, so validate before copying.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(dir, "entry.txt");
const text = readFileSync(entryPath, "utf8").trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${text.length}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(entryPath, join(outDir, "entry.txt"));
console.log(`entry.txt (${text.length} chars) copied to ${outDir}`);
