import { defineConfig } from 'vitest/config';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'resources/js/__tests__/setup.ts',
        // Optionally, you can specify test directories and file patterns
        // include: ['tests/**/*.test.{ts,tsx}'],
    },
});
