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
        primary: "#FFB6C1",
        secondary: "#87CEEB",
        accent: "#FFE4E1",
        text: "#4A4A4A",
        muted: "#9A9A9A",
        background: "#FFFAF0",
        surface: "#FFFFFF",
        border: "#F0E6E6",
      },
      fontFamily: {
        'sans': ['"Nunito"', '"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgb(255 182 193 / 0.15), 0 2px 8px -4px rgb(255 182 193 / 0.1)',
        'cute': '0 8px 30px -4px rgb(255 182 193 / 0.25), 0 4px 12px -6px rgb(255 182 193 / 0.15)',
      }
    },
  },
  plugins: [],
};
