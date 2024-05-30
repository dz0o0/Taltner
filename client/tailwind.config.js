/* eslint-disable sort-keys-custom-order/object-keys */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        progateBaseBG: "#f9fbfe", // progate.comで使われているメイン背景色
        progateSidebarBG: "#ffffff", // progate.comで使われているサイドバーの背景色
        progateSidebarBorder: "#ececec", // progate.comで使われているサイドバーのborderRight色
        border: "#dee2e6", // カスタム境界線色
        foreground: "#333333",
      },
      // shadcn Acordionコンポーネントの設定
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
};
