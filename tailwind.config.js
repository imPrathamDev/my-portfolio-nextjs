/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "dream-avenue": ['"Dream Avenue"', "serif"],
      sans: ['"Raleway"', "sans-serif"],
      "sans-thin": ['"Raleway Thin"', "sans-serif"],
      "sans-light": ['"Raleway Light"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#f0a500",
        "primary-black": "#0e0a0a",
        "primary-white": "#eeeee6",
        "primary-dark-white": "#aba9a8",
      },
      animation: {
        blob: "blob 7s reverse infinite",
        marquee: "marquee 5s linear alternate infinite",
        shake: "shake 2s linear alternate infinite",
        "rotate-anim": "rotate-anim 10s linear alternate infinite",
        "marquee-hero": "marquee-hero 25s linear infinite",
        "marquee-hero-2": "marquee-hero-2 25s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            rotate: "0deg",
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            rotate: "90deg",
            transform: "translate(30px, -50px) scale(1.15, 1)",
          },
          "66%": {
            rotate: "180deg",
            transform: "translate(-20px, 20px) scale(0.95, 1)",
          },
          "100%": {
            rotate: "360deg",
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        marquee: {
          "0%": { left: 0 },
          "100%": { left: "-100%" },
        },
        shake: {
          "0%": {
            rotate: "0deg",
          },
          "33%": {
            rotate: "20deg",
          },
          "66%": {
            rotate: "-20deg",
          },
          "100%": {
            rotate: "0deg",
          },
        },
        "rotate-anim": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "marquee-hero": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-hero-2": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.primary-white"),
            a: {
              color: theme("colors.primary-dark-white"),
              "&:hover": {
                color: theme("colors.primary"),
                letterSpacing: "0.05em",
              },
            },
            h1: {
              color: theme("colors.primary-white"),
            },
            h2: {
              color: theme("colors.primary-white"),
            },
            h3: {
              color: theme("colors.primary-white"),
            },
            h4: {
              color: theme("colors.primary-white"),
            },
            h5: {
              color: theme("colors.primary-white"),
            },
            h6: {
              color: theme("colors.primary-white"),
            },
            code: {
              color: theme("colors.primary-dark-white"),
            },
            strong: {
              color: theme("colors.primary-white"),
            },
            blockquote: {
              color: theme("colors.primary-dark-white"),
            },
            "ol > li > ::marker": {
              color: theme("colors.primary-white"),
            },
            pre: {
              backgroundColor: "#252525",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
