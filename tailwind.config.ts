import type { Config } from "tailwindcss";

const config = {
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
