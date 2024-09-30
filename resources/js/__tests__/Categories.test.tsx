// tests/ts/Pages/Categories.test.tsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import Categories from '@/Pages/Categories';
import { Category } from '@/types';
import { vi } from 'vitest';

// Mock the router and usePage from @inertiajs/react while preserving other exports
vi.mock('@inertiajs/react', async () => {
    const actual = (await vi.importActual('@inertiajs/react')) as any;
    return {
        ...actual,
        router: {
            ...actual.router,
            delete: vi.fn(),
        },
        usePage: () => ({
            props: {
                auth: {
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                        // Add other user properties as needed
                    },
                },
                errors: {},
                flash: {},
                // Add other props if your components rely on them
            },
        }),
        Head: ({ title }: { title: string }) => <title>{title}</title>, // Simple mock of Head
    };
});

// Import the mocked router after setting up the mock
import { router } from '@inertiajs/react';

// Define sample categories data
const sampleCategories: Category[] = [
    { id: 1, name: 'Category One' },
    { id: 2, name: 'Category Two' },
];

describe('Categories Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Reset mocks before each test
    });

    it('renders the category list', () => {
        render(<Categories categories={sampleCategories} />);

        // Check if category headers are present
        expect(screen.getByText('#')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

        // Check if sample categories are rendered
        sampleCategories.forEach((category) => {
            expect(screen.getByText(category.id.toString())).toBeInTheDocument();
            expect(screen.getByText(category.name)).toBeInTheDocument();
        });
    });

    it('opens the add category modal when "Add Category" button is clicked', () => {
        render(<Categories categories={sampleCategories} />);

        const addButton = screen.getByTestId('add-category-modal-button');
        fireEvent.click(addButton);

        const modal = screen.getByRole('dialog');

        // Scope the query within the modal
        const modalWithin = within(modal);
        expect(modalWithin.getByText(/add category/i)).toBeInTheDocument();
    });

    it('opens the edit category modal when edit button is clicked', () => {
        render(<Categories categories={sampleCategories} />);

        // Find the edit button using aria-label
        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        expect(editButtons).toHaveLength(sampleCategories.length); // Ensure correct number of edit buttons

        // Click the edit button for the first category
        fireEvent.click(editButtons[0]);

        // Assuming the modal has role="dialog" and a specific title
        const modal = screen.getByRole('dialog');
        const modalWithin = within(modal);
        expect(modalWithin.getByText(/update category/i)).toBeInTheDocument();
    });

    it('calls router.delete when delete button is clicked', () => {
        render(<Categories categories={sampleCategories} />);

        // Find the delete button using aria-label
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        expect(deleteButtons).toHaveLength(sampleCategories.length); // Ensure correct number of delete buttons

        // Click the delete button for the first category
        fireEvent.click(deleteButtons[0]);

        // Verify that router.delete was called with the correct route
        expect(router.delete).toHaveBeenCalledWith('/categories/1');
    });
});
