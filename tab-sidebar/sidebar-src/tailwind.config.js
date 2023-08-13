/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      nord0: '#2e3440',
      nord1: '#3b4252',
      nord2: '#434c5e',
      nord3: '#4c566a',
      nord4: '#d8dee9',
      nord5: '#e5e9f0',
      nord6: '#eceff4',
      nord12: '#d08770',
      nord15: '#b48ead',
      focusedClr: 'rgba(216, 222, 233, 0.2)',
      focusedClr2: 'rgba(216, 222, 233, 0.05)'
    },
    fontFamily: {
      inter: [ 'Inter', 'sans-serif' ]
    },
    extend: {}
  },
  plugins: []
};
