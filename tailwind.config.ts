import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html}", // ← важно: чтобы Tailwind увидел классы в landing-body.html
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F2F0EB",
        surface: "#EBE8E3",
        text: "#0F0F0F",
        "text-secondary": "#4A4A4A",
        line: "#B8B5AF",
        accent: "#8C7B6C",
        footer: "#0F0F0F",
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', "serif"],
        sans: ['"Noto Sans JP"', "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
} satisfies Config;
