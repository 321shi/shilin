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
        primary: "#FFC107",
        secondary: "#FF9800",
        accent: "#FFEB3B",
        text: "#1A1A1A",
        background: "#FFFDE7",
        surface: "#FFFFFF",
        border: "#1A1A1A",
      },
      fontFamily: {
        'comic': ['"Bangers"', 'cursive'],
        'sans': ['"Roboto"', 'sans-serif'],
      },
      boxShadow: {
        'comic': '6px 6px 0px #1A1A1A',
        'comic-sm': '3px 3px 0px #1A1A1A',
      }
    },
  },
  plugins: [],
};
