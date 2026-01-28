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
        sans: ['PingFang SC', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'text-prime': '#4A4A4A',
        'text-second': '#666666',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
} satisfies Config;
