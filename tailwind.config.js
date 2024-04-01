/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
