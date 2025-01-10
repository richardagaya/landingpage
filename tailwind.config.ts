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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "#FFD700", // Matches your logo's gold
        hero: "#011631",
        darkblue: "#020D23",
        lightblue: "#719AC4",
        midle:"06338D",
        new:"06238D",
        hover1:"DDB720",
      },
    },
  },
  plugins: [],
} satisfies Config;
