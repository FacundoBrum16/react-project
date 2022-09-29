/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'table-shadow': '1px 1px 6px #BECAE3',
        'dark-table-shadow': '1px 1px 6px #031430',
      }
    },
  },
  plugins: [],
}
