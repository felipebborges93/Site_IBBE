import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marinho: "#122035",
        cobalto: "#1765C2",
        ceu: "#48A4FF",
        gelo: "#D7E9F4",
        "gelo-light": "#F4F9FD",
        verde: "#00A818",
        branco: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        "elevation-1": "0 4px 20px -2px rgba(18, 32, 53, 0.05), 0 2px 6px -1px rgba(18, 32, 53, 0.03)",
        "elevation-2": "0 12px 32px -4px rgba(29, 117, 221, 0.12), 0 4px 12px -2px rgba(18, 32, 53, 0.06)",
        "elevation-3": "0 24px 48px -12px rgba(18, 32, 53, 0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
