import { light } from "@fortawesome/fontawesome-svg-core/import.macro";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'serif'], // For Google Fonts
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#FFD700", // Matches your logo's gold
        hero: "#011631",
        darkblue: "#020D23",
        basecolor:"#f1bf2a",
        first: "#1f2937",
        darkbg: "#1f2937",
        second: "#ffbf00",
      },
    },
  },
  plugins: [],
} satisfies Config;
