/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light"],  // Thêm 2 theme light và dark
  },
  plugins: [
    require('daisyui'),
  ],
}