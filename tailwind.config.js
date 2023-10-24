/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      styles: ["./src/css/styles.css"],
    },
    colors: {
      night: "#476D6A",
      day: "#FBD5A4",
      light: "#f73413",
      dark: "#476D6A",
      xDark: "#1B2D4A",
      oDark: "#729C96",
      xLight: "#B61C1C",
      oLight: "#FFD964",
      black: "#000000",
      white: "#FFFFFF",
      transparent: "transparent",
      orange: "orange",
      red: "red",
      green: "green",
      blue: "blue",
    },
  },
  plugins: [],
};
