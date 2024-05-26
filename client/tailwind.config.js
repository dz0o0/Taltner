/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa", // カスタム背景色
        border: "#dee2e6", // カスタム境界線色
        foreground: '#333333',
      },
    },
  },
};
