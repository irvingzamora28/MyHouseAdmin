import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Primary color palette (indigo)
                primary: {
                    light: '#818CF8', // Light indigo
                    DEFAULT: '#4F46E5', // Default indigo (main)
                    dark: '#3730A3', // Dark indigo
                },
                // Secondary color palette (cool gray)
                secondary: {
                    light: '#D1D5DB', // Light gray
                    DEFAULT: '#6B7280', // Cool gray
                    dark: '#374151', // Dark gray
                },
                // Accent color palette (teal)
                accent: {
                    light: '#5EEAD4', // Light teal
                    DEFAULT: '#14B8A6', // Default teal
                    dark: '#0F766E', // Dark teal
                },
                // Neutral and background colors
                neutral: {
                    light: '#F9FAFB', // Off-white for backgrounds
                    dark: '#1F2937', // Darker gray for dark mode
                    contentLight: '#6B7280', // Text content in light mode
                    contentDark: '#F3F4F6', // Text content in dark mode
                },
            },
            boxShadow: {
                card: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
            },
        },
    },

    plugins: [forms],
};
