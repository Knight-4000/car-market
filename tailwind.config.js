/** @type {import('tailwindcss').Config} */
const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '4rem',
      },
    },
  },
  plugins: [
   
  ],
};