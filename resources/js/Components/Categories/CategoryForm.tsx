import { useState } from 'react';
import ActionButton from '../ActionButton';

interface Category {
    id: number;
    name: string;
}

interface CategoryFormProps {
    category?: Category;
    categories: Category[];
    setCategories: (categories: Category[]) => void;
    closeModal: () => void;
}

export default function CategoryForm({ category, categories, setCategories, closeModal }: CategoryFormProps) {
    const [name, setName] = useState(category ? category.name : ''); // Category name state

    // Handle form submission for adding or editing category
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (category) {
            // Edit existing category
            setCategories(categories.map((cat) => (cat.id === category.id ? { ...cat, name } : cat)));
        } else {
            // Add new category
            const newCategory = { id: categories.length + 1, name };
            setCategories([...categories, newCategory]);
        }
        closeModal(); // Close modal after submission
    };

    return (
        <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                />
            </div>

            <div className="flex justify-end">
                <ActionButton label="Cancel" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600" />
                <ActionButton label={category ? 'Update Category' : 'Add Category'} className="bg-indigo-500 hover:bg-indigo-600" />
            </div>
        </form>
    );
}
