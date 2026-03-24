import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
    './resources/js/**/*.tsx',
    './resources/js/**/*.ts',
  ],

  theme: {
    extend: {
      fontFamily: {
        'noto-serif-hk': ['"Noto Serif HK"', 'serif'],
        montserrat: ['"Montserrat"', 'serif'],
        inter: ['"Inter"', 'sans'],
      },
      colors: {
        june: {
          brown: '#7C634D',
          light: '#FFF6EC',
          dark: '#020002',
          gray: '#525252',
          pink: '#c45e5e',
          cream: '#F8F1EB',
        },
      },
      spacing: {
        container: '1rem',
        'container-md': '2rem',
        'container-lg': '4rem',
        'container-xl': '6rem',
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },

  plugins: [forms],
};
