/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
        50:  '#faf7fc',   // very light lavender wash
        100: '#f4eff8',   // soft pastel lilac
        200: '#e6dbf0',   // light lavender
        300: '#d3bfe6',   // muted lilac
        400: '#b896d8',   // stronger lilac
        500: '#9c6cc8',   // classic lilac/purple
        600: '#b28be8',   // bright lavender accent
        700: '#9b6cd9',   // deeper accent purple
        800: '#824fca',   // darker lilac-purple
        900: '#6e3bb5',   // richest deep purple
        },

        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        'sans': ['Lexend', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
