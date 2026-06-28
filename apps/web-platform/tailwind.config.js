/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg-primary)',
        primary: 'var(--color-accent-primary)',
        secondary: 'var(--color-accent-secondary)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
}
