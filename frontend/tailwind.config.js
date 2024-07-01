/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["winter", "dim", "acid", "dracula", "lofi", "black"],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
