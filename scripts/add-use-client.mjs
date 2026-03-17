import { readFileSync, writeFileSync } from "fs";

const files = [
  "dist/index.js",
  "dist/index.cjs",
];

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, `"use client";\n${content}`);
    console.log(`✓ Added "use client" to ${file}`);
  }
}
