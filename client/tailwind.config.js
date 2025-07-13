/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      },
      fontFamily: {
        'man': ['Manrope', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s infinite',
      }
    },
  },
  plugins: [],
} 