/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ covers /app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ legacy support
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ reusable components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
