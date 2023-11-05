/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#08C25E",
        secondary:"#FFB930",
        grey:"#F9F9F9"
      }
    },
  },
  plugins: [],
};
