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
        primary: "#FF3D00",
        secondary: "#0066FF",
        accent: "#FFEB3B",
        text: "#1A1A1A",
        background: "#FFF9E6",
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
