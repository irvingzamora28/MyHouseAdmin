import { FlatCompat } from '@eslint/eslintrc';

// Compatibility layer to bring in ESLint configurations that rely on the older format
const compat = new FlatCompat();

export default [
    {
        // Apply to all JavaScript and TypeScript files
        files: ['**/*.{js,jsx,ts,tsx}'],

        settings: {
            react: {
                version: 'detect',
            },
        },

        // Language options define the environment and parser
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',

            // Set the parser for TypeScript
            parser: '@typescript-eslint/parser',

            // Define globals
            globals: {
                browser: true,
                node: true,
            },
        },
    },
    // Compatibility for older extends using FlatCompat
    ...compat.extends('plugin:react/recommended'),
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    ...compat.extends('plugin:prettier/recommended'),

    // Custom rules for the project
    {
        rules: {
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off', // Not needed for React 17+
            'react/prop-types': 'off', // Not needed for TypeScript
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'react/no-unescaped-entities': 'off', // Disable unescaped entity checking
        },
    },

    // Add the ignores property to replace .eslintignore
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'public',
            'vendor',
            'bootstrap/ssr/*', // These files are pre-built from Laravel Breeze scaffolding
            'resources/js/Pages/Auth/*', // Ignoring pre-built auth-related pages from Breeze
            'resources/js/Pages/Profile/Partials/*', // Ignoring pre-built profile components from Breeze
            'resources/js/ssr.tsx', // Pre-built server-side rendering file from Breeze
            'resources/js/types/global.d.ts', // Pre-built type definitions from Breeze
        ],
    },
];
