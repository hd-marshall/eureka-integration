// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'eb-garamond': ['var(--font-eb-garamond)', 'serif'],
        'nunito-sans': ['var(--font-nunito-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config