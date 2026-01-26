import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                'noto-serif-hk': ['"Noto Serif HK"', 'serif'],
                'montserrat': ['"Montserrat"', 'serif'],
                'inter': ['"Inter"', 'sans'],
            },
            colors: {
                'june': {
                    'brown': '#7C634D',
                    'light': '#FFF6EC',
                    'dark': '#020002',
                    'gray': '#525252',
                    'pink': '#c45e5e',
                    'cream': '#F8F1EB',
                },
            },
            spacing: {
                'container': '1rem',
                'container-md': '2rem',
                'container-lg': '4rem',
                'container-xl': '6rem',
            },
        },
    },

    plugins: [forms],
};
