/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kayal: {
          bg: "#FAF7F0",
          "bg-alt": "#F4EFE6",
          primary: "#2C241E",
          secondary: "#5C5148",
          muted: "#8A7E75",
          teal: "#2A4D45",
          "teal-accent": "#3F685E",
          "teal-light": "#5A857A",
          gold: "#9E7D47",
          "gold-light": "#C4A46E",
          border: "rgba(92, 81, 72, 0.18)",
          "border-light": "rgba(92, 81, 72, 0.1)",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', '"Pinyon Script"', 'cursive'],
        malayalam: ['"Noto Serif Malayalam"', 'Gayathri', 'Manjari', 'serif'],
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

