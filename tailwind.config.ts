import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#0A0A0A",
        fumee: "#7A7A7A",
        creme: "#F0EDE8",
        dore: "#C9A961",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        xwide: "0.35em",
        xxwide: "0.5em",
      },
      transitionTimingFunction: {
        // Easing signature de la marque.
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "700": "700ms",
        "1000": "1000ms",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
