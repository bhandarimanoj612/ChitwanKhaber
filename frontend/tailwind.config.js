/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121221",
        txtLight: "#6C6C6C",
        darkMode: "#121212"
      },
      backgroundImage: {
        "hero-img1": "url('/src/images/see.png')",
        "hero-img2": "url('/src/images/UML.jpg')",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        timesNewRoman: ["Tinos", "serif"],
        domine: ["Domine", "serif"],
        sideFont: ["Roboto", "sans-serif"],
        hotTopicsFont: ["Poppins", "sans-serif"],
        mukta: ["Mukta", "sans-serif"],
        karma: ["Karma", "serif"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@shrutibalasa/tailwind-grid-auto-fit"),
  ],
};

