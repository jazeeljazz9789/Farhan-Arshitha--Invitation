/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#b89b63',
          dark: '#967a3e',
          light: '#d2c3a7'
        }
      }
    },
  },
  plugins: [],
}
