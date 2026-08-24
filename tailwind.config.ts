import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        peach: "var(--color-peach)",
        blush: "var(--color-blush)",
        lilac: "var(--color-lilac)",
        sage: "var(--color-sage)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        rose: {
          DEFAULT: "var(--color-rose)",
          deep: "var(--color-rose-deep)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Heebo", "sans-serif"],
        sans: ["var(--font-sans)", "IBM Plex Sans Hebrew", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(61, 56, 104, 0.32)",
        card: "0 10px 30px -18px rgba(61, 56, 104, 0.2)",
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        lila: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
