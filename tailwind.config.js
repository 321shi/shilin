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
        primary: "#6366f1",
        secondary: "#06b6d4",
        accent: "#f59e0b",
        text: "#f1f5f9",
        muted: "#94a3b8",
        background: "#0f172a",
        surface: "rgba(30, 41, 59, 0.7)",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        'sans': ['"Inter"', '"Noto Sans SC"', 'sans-serif'],
        'display': ['"Space Grotesk"', '"Noto Sans SC"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'medium': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'glow': '0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px var(--glow-color, #6366f1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)' },
        },
      },
    },
  },
  plugins: [],
};
