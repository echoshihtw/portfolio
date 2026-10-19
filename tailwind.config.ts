import type { Config } from "tailwindcss";
// Puts Clio's three brand colours on :root as --clio-paper, --clio-pink and
// --clio-ink. The package is the one place those values live.
import clioBrand from "@echoshihtw/clio-brand/preset.js";

const config = {
  presets: [clioBrand],
  // Dark mode is driven by a class on <html>, set before first paint by the
  // theme script in app.html.
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
