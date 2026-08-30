/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1B2A4A",
        cream: "#FAF6EE",
        brick: "#A63D2F",
        mustard: "#D9A441",
        sage: "#7C9885",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Hind Siliguri", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
