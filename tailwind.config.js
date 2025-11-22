/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7622',
        dark: '#121223',
        'gray-light': '#f5f5f5',
        'gray-medium': '#e0e0e0',
        'gray-dark': '#666666',
      },
      maxWidth: {
        app: '480px',
      },
    },
  },
  plugins: [],
}

