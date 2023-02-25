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
      },
      keyframes: {
        blob: {
          "0%": {
            rotate: "0deg",
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            rotate: "90deg",
            transform: "translate(30px, -50px) scale(1.05)",
          },
          "66%": {
            rotate: "180deg",
            transform: "translate(-20px, 20px) scale(0.95)",
          },
          "100%": {
            rotate: "360deg",
            transform: "translate(0px, 0px) scale(1)",
          },
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
