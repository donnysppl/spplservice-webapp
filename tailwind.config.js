/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#023189',
        primaryFade: '#0231898a',
        secondary: '#e7ebee',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}