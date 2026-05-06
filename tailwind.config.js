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
        primary: "#1e3a8a",
        secondary: "#06b6d4",
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'lato': ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
