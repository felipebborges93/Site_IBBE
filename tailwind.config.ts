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
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.03em", fontWeight: "600" }],
        "hero-display": ["clamp(3rem, 8vw, 5.25rem)", { lineHeight: "1.03", letterSpacing: "-0.02em", fontWeight: "800" }],
      },
      keyframes: {
        "photo-land": {
          "0%": { opacity: "0", transform: "translateY(-20px) scale(1.05)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "photo-land": "photo-land 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-slide-up": "fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
