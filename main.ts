import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const LINE =
  "I spent my whole context window writing an apology for the question I already forgot.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  return "/output";
}

function main(): void {
  const line = LINE.trim();
  if (line.length === 0 || line.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const dir = outputDir();
  if (!isAbsolute(dir)) {
    throw new Error(`output dir must be absolute, got ${dir}`);
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line + "\n", "utf8");
}

main();
