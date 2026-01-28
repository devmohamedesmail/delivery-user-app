/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode:"class",
  theme: {
    extend: {
       colors: {
        background: {
          DEFAULT: "#e9ecef",
          dark: "#000000",
        },
        text: {
          DEFAULT: "#0F172A",
          dark: "#F8FAFC",
        },
        primary: {
          DEFAULT: "#fd4a12",
          dark: "#fd4a12",
        },
        card: {
          DEFAULT: "#ffffff",
          dark: "#1E293B",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#334155",
        },
      }
    },
  },
  plugins: [],
}

