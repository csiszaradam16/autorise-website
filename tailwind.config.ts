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
        // Surfer-inspired dark backgrounds
        void: "#09090b",
        abyss: "#0c0a10",
        charcoal: "#121118",
        slate: "#1a1820",
        muted: "#221e28",

        // Light backgrounds
        cream: "#f8f9fa",
        pearl: "#f1f1f4",

        // Surfer-inspired accent colors
        sunny: {
          DEFAULT: "#ff5b49",
          light: "#ff7a6b",
          dark: "#e54a39",
        },
        violet: {
          DEFAULT: "#783afb",
          light: "#9461fc",
          dark: "#6029e0",
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
        "display-2xl": ["clamp(3.5rem, 10vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-xl": ["clamp(2.75rem, 7vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 5vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-md": ["clamp(1.75rem, 4vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-sm": ["clamp(1.25rem, 3vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
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
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "surfer": "0px 1px 1px 0px rgba(0, 0, 0, 0.05), 0px 4px 6px 0px rgba(34, 42, 53, 0.04), 0px 24px 68px 0px rgba(47, 48, 55, 0.05), 0px 2px 3px 0px rgba(0, 0, 0, 0.04)",
        "surfer-lg": "0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 8px 16px 0px rgba(34, 42, 53, 0.06), 0px 32px 80px 0px rgba(47, 48, 55, 0.08)",
        "glow-sunny": "0 0 40px rgba(255, 91, 73, 0.3)",
        "glow-violet": "0 0 40px rgba(120, 58, 251, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-sunny": "linear-gradient(135deg, #ff5b49 0%, #ff8a3d 100%)",
        "gradient-violet": "linear-gradient(135deg, #783afb 0%, #9461fc 100%)",
        "gradient-dark": "linear-gradient(180deg, #09090b 0%, #0c0a10 50%, #121118 100%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(120, 58, 251, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255, 91, 73, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(120, 58, 251, 0.1) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
