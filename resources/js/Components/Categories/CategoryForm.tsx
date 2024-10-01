import { useForm } from '@inertiajs/react';
import ActionButton from '../ActionButton';
import TextInputField from '../Form/TextInputField';

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
            put(route('categories.update', category.id), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        } else {
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
            <TextInputField
                label="Category Name"
                name="name"
                value={data.name}
                placeholder="Category Name"
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
            />

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
