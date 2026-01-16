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
        // Dark backgrounds
        void: "#09090b",
        abyss: "#0c0a10",
        charcoal: "#121118",
        slate: "#1a1820",
        muted: "#221e28",

        // Light backgrounds
        cream: "#f8f9fa",
        pearl: "#f1f1f4",

        // Primary accent - Orange #FF5B49
        orange: {
          DEFAULT: "#FF5B49",
          50: "#FFF5F3",
          100: "#FFE8E5",
          200: "#FFD1CC",
          300: "#FFADA3",
          400: "#FF8477",
          500: "#FF5B49",
          600: "#FF3621",
          700: "#E62000",
          800: "#B81A00",
          900: "#8A1300",
        },

        // Neutrals
        ash: "#71717a",
        smoke: "#a1a1aa",
        silver: "#d4d4d8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-xl": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-md": ["clamp(1.5rem, 3.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" }],
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "card": "0px 1px 1px 0px rgba(0, 0, 0, 0.05), 0px 4px 6px 0px rgba(34, 42, 53, 0.04), 0px 24px 68px 0px rgba(47, 48, 55, 0.05)",
        "card-hover": "0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 8px 16px 0px rgba(34, 42, 53, 0.06), 0px 32px 80px 0px rgba(47, 48, 55, 0.08)",
        "glow-orange": "0 0 60px rgba(255, 91, 73, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
