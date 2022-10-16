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
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
