/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#8B6F47",
        accent: "#D4A574",
        text: "#2C2C2C",
        muted: "#6B7280",
        background: "#FDFCF9",
        surface: "#FFFFFF",
      },
      fontFamily: {
        'serif': ['"Source Serif 4"', 'serif'],
        'sans': ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
