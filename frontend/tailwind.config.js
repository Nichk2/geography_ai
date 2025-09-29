/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Ensure dark mode colors are available
        dark: {
          bg: '#111827',
          surface: '#1f2937',
          text: '#f9fafb',
        }
      }
    },
  },
  plugins: [],
}
