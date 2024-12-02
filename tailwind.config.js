/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add custom fonts here
        christmas: ['Mountains of Christmas', 'cursive'],
        sans: ['Inter', 'sans-serif'],
        // Add more fonts as needed
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}