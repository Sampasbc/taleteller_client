/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tt-primary": "#995de7",
        "tt-secondary": "#e6cb68",
        "tt-secondary-shade": "#4c3101"
      },
      fontSize: {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "2rem"
      },
      fontFamily: {
        "inter": "Inter"
      }
    },
  },
  plugins: [],
}
