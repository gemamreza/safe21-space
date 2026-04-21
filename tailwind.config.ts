import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#F0EFFE",
          100: "#DDD9FC",
          200: "#BEB8F8",
          400: "#8B82E8",
          500: "#6355D8",
          600: "#4B3EC0",
          700: "#3730A3",
          900: "#1E1B6A",
        },
        sage: {
          50:  "#F0F7F4",
          100: "#D6EDE5",
          400: "#5DBFA0",
          600: "#2D8A6A",
          800: "#1A5243",
        },
        peach: {
          50:  "#FEF3ED",
          100: "#FDE0CF",
          400: "#F08050",
          600: "#C45830",
          800: "#8C3A1A",
        },
      },
      fontFamily: {
        display: ["'DM Serif Display'", "Georgia", "serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float:     { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
      },
    },
  },
  plugins: [],
};
export default config;
