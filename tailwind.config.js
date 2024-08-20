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
        "tt-secondary-shade": "#4c3101",
        "tt-secondary-hover": "#bca34a",
      },
      fontSize: {
        "button": "1rem",
        "body-sx": "0.75rem",
        "body-sm": "0.875rem",
        "body-md": "1rem",
        "body-lg": "1.125rem",
        "heading-xm": "1rem",
        "heading-sm": "1.125rem",
        "heading-md": "1.25rem",
        "heading-lg": "2rem"
      },
      fontFamily: {
        "inter": "Inter"
      }
    },
  },
  plugins: [],
}
