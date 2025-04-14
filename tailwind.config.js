
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        ignite: {
          DEFAULT: "#FF6B00",
          50: "#FFF3E6",
          100: "#FFE7CC", 
          200: "#FFD099",
          300: "#FFB866",
          400: "#FFA133",
          500: "#FF8A00",
          600: "#FF6B00",
          700: "#CC5500",
          800: "#994000",
          900: "#662A00"
        },
        dark: {
          DEFAULT: "#121212",
          300: "#404040",
          400: "#262626",
          500: "#171717",
          600: "#0F0F0F",
          700: "#0A0A0A",
          800: "#050505",
          900: "#000000"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
