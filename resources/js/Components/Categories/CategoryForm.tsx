import { useForm } from '@inertiajs/react';
import ActionButton from '../ActionButton';

interface Category {
    id: number;
    name: string;
}

interface CategoryFormProps {
    category?: Category;
    closeModal: () => void;
}

export default function CategoryForm({ category, closeModal }: CategoryFormProps) {
    const { data, setData, post, put, errors, reset } = useForm({
        name: category ? category.name : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (category) {
            // Update existing category
            put(route('categories.update', category.id), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        } else {
            // Create new category
            post(route('categories.store'), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Name"
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>} {/* Display validation error */}
            </div>

            <div className="flex justify-end">
                <ActionButton label="Cancel" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600" />
                <ActionButton
                    label={category ? 'Update Category' : 'Add Category'}
                    className="bg-indigo-500 hover:bg-indigo-600"
                    dataTestId="add-category-action-button"
                />
            </div>
        </form>
    );
}
