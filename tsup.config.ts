import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/lucide-animated.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: [
    "react",
    "react-dom",
    "tailwindcss",
    "react-hook-form",
    "react-day-picker",
    "motion",
    "lucide-animated",
  ],
});
