/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        mainColor: "#334B11",
        altColor: "#222222",
        lightGreen: "#F3FBEF",
        lightColor: "#AFAFAF",
        gray: "#FAFAFA",
      },
      backgroundImage: {
        bodyImg: "url('assets/pattern_background.jpg')",
      },
      keyframes: {
        contentSlideIn: {
          "0%": {
            opacity: 0,
            transform: "translateX(-40px)",
          },
          "100%": {
            opacity: 1,
            transform: " translateX(0)",
          },
        },
        fade: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        contentSlideIn:
          "500ms ease-in-out 0s normal none 1 running contentSlideIn",
        fade: "500ms ease-in-out 0s normal none 1 running fade",
      },
    },
  },
  plugins: [],
};
