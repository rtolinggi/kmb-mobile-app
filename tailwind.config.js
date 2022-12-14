/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#f43f5e',
          light: '#fb7185',
        },
        error: {
          default: 'red',
        },
      },
    },
  },
  plugins: [],
};
