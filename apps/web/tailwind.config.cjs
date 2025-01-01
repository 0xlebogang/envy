const theme = require("@envyper/tailwind-config/tailwind.config");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme,
  plugins: [nextui()],
};
