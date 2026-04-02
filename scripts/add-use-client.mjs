import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const dist = "dist";
const files = readdirSync(dist).filter(
  (name) =>
    (name.endsWith(".js") || name.endsWith(".cjs")) &&
    !name.startsWith("icons."),
);

for (const name of files) {
  const file = join(dist, name);
  const content = readFileSync(file, "utf-8");
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, `"use client";\n${content}`);
    console.log(`✓ Added "use client" to ${file}`);
  }
}
