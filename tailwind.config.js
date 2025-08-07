/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f2',
          100: '#dce9e2',
          200: '#bcd3c8',
          300: '#91b8a6',
          400: '#67967f',
          500: '#4a7a64',
          600: '#2d4a3e',
          700: '#264237',
          800: '#1f352e',
          900: '#1a2d27',
        },
        secondary: {
          50: '#f7f4f0',
          100: '#ede5dc',
          200: '#dbccbb',
          300: '#c4ab94',
          400: '#ac896d',
          500: '#8b7355',
          600: '#7a6249',
          700: '#65513e',
          800: '#534337',
          900: '#453830',
        },
        accent: {
          50: '#fef3ed',
          100: '#fde4d4',
          200: '#fac5a8',
          300: '#f69f71',
          400: '#f07638',
          500: '#e67e22',
          600: '#d45d0a',
          700: '#b8470b',
          800: '#923b0f',
          900: '#753210',
        },
        surface: '#ffffff',
        background: '#f8f6f3',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}