/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

