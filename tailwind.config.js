/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Tambahkan font Outfit
      },
    },
  },
  plugins: [daisyui],
}

