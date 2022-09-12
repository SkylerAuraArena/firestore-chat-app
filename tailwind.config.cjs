/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        whiteBg: "#f7f7f7",
        exit: "1f1f1f",
      }
    },
  },
  plugins: [],
}