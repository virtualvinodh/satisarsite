/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#fdf6e3',
          DEFAULT: '#f5e6d3',
          dark: '#e6d5bc',
        }
      }
    },
  },
  plugins: [],
}
