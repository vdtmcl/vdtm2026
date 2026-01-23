/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          ...require('tailwindcss/colors').slate,
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e8e8e8', // User provided light gray
          900: '#21305c', // User provided dark blue
          950: '#21305c', // Mapping to dark blue for consistency
        },
        blue: {
          ...require('tailwindcss/colors').blue,
          500: '#31549c', // User provided medium blue
          600: '#21305c', // User provided dark blue for interactions
        },
        sky: {
          ...require('tailwindcss/colors').sky,
          500: '#29a3dd', // User provided light blue
        },
        // Explicit brand colors for usage if needed
        vdtm: {
          light: '#29a3dd',
          medium: '#31549c',
          dark: '#21305c',
          gray: '#e8e8e8',
        }
      }
    }
  },
  plugins: [],
}