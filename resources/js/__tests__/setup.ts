// tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Define a global variable to hold the current route name
let currentRouteName: string = 'dashboard'; // Default current route

// Define a mapping from route names to their corresponding paths
const routeMap: Record<string, string> = {
    dashboard: '/dashboard',
    'categories.index': '/categories',
    'categories.destroy': '/categories/:id',
    settings: '/settings',
    'profile.edit': '/profile/edit',
    logout: '/logout',
    // Add other routes as needed
};

// Declare the global `route` function with TypeScript
declare global {
    let route: {
        (name: keyof typeof routeMap, id?: number): string;
        (): {
            current: (name: keyof typeof routeMap) => boolean;
        };
    };
}

// Mock the global `route` function
global.route = vi.fn((name?: string, id?: number) => {
    if (typeof name === 'string') {
        if (id !== undefined) {
            // Replace ':id' with the actual id in the path
            const pathTemplate = routeMap[name as keyof typeof routeMap];
            return pathTemplate.replace(':id', id.toString());
        }
        // Return the path for the given route name
        return routeMap[name as keyof typeof routeMap] || '/unknown-route';
    } else if (typeof name === 'undefined') {
        // Return an object with the `current` method
        return {
            current: (routeName: string) => routeName === currentRouteName,
        };
    }
    return '/unknown-route';
});

// Provide a way to set the current route in tests
(global.route as any).setCurrentRoute = (routeName: string) => {
    currentRouteName = routeName;
};
