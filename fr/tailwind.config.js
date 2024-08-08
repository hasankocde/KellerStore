/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        "light-grey": "#f5f5f5",
        "button-blue": "#0022aa",
        "button-orange": "#f3630f",
        "facebook-button-blue": "#4267b2",
        "twitter-button-blue": "#1da1f2",
        "google-button-red": "#db4437",
        "button-green": "#11b76b",
        "background-category-icon-blue": "#dffbff",
        "background-footer-dark-blue": "#080229",
        "background-filter-light-blue": "#285bb0",
        "background-grey": "#d9d9d9",
        "background-cart-grey": "#b5b0b0",
        "like-yellow": "#e8ce00",
        "view-green": "#8edb04",
        "icon-dark-grey": "#585454",
      },
    },
  },
  plugins: [],
};
