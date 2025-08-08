/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#E0E5EC",
        foreground: "#374151",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#E0E5EC",
          foreground: "#6B7280",
        },
        border: "#D1D5DB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "title": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      boxShadow: {
        "neumorphic": "8px 8px 16px #BEC3CA, -8px -8px 16px #FFFFFF",
        "neumorphic-inset": "inset 8px 8px 16px #BEC3CA, inset -8px -8px 16px #FFFFFF",
        "neumorphic-hover": "12px 12px 24px #BEC3CA, -12px -12px 24px #FFFFFF",
        "neumorphic-pressed": "inset 4px 4px 8px #BEC3CA, inset -4px -4px 8px #FFFFFF",
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
