/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define colors in hex/rgb format to avoid oklch issues
        primary: '#3b82f6',
        secondary: '#6b7280',
      }
    },
  },
  plugins: [],
  corePlugins: {
    // Ensure colors are in RGB/HEX format
  },
}
