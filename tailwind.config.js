/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        korean: ['Ownglyph_ParkDaHyun', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}