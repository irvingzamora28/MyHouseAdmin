import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal'; // Use the Laravel Breeze Modal
import ActionButton from '@/Components/ActionButton';
import CategoryForm from '@/Components/Categories/CategoryForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

import React, { PropsWithChildren } from 'react';

interface ButtonProps {
    icon: React.ReactNode; // The button will only show an icon
    onClick?: () => void; // Click handler
    className?: string; // Extra classes
    type?: 'button' | 'submit'; // Button type
    color?: string; // Text (icon) color
}
const IconButton = ({ icon, onClick, className, type = 'button', color = 'gray-500' }: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`text-${color} hover:text-${color} focus:outline-none transition ease-in-out duration-150 ${className}`}
        >
            {icon}
        </button>
    );
};

interface Category {
    id: number;
    name: string;
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Furniture' },
        { id: 3, name: 'Kitchenware' },
    ]);

    const [showModal, setShowModal] = useState(false); // For handling the form modal
    const [editCategory, setEditCategory] = useState<Category | undefined>(); // For editing existing categories

    const handleAddCategory = () => {
        setShowModal(true);
        setEditCategory(undefined); // Reset for new category
    };

    const handleEditCategory = (category: Category) => {
        setEditCategory(category);
        setShowModal(true);
    };

    const handleDeleteCategory = (categoryId: number) => {
        setCategories(categories.filter((category) => category.id !== categoryId));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categories</h2>}>
            <Head title="Categories" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Category List</h3>
                            <ActionButton label="Add Category" onClick={handleAddCategory} className="bg-indigo-500 hover:bg-indigo-600" />
                        </div>

                        {/* Categories Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-800 dark:text-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-start">#</th>
                                        <th className="px-4 py-2 text-start">Name</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-4 py-2">{category.id}</td>
                                            <td className="px-4 py-2">{category.name}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex space-x-4 justify-center">
                                                    <IconButton
                                                        icon={<FaEdit className="text-yellow-500" />}
                                                        onClick={() => handleEditCategory(category)}
                                                        className="mr-2"
                                                    />
                                                    <IconButton
                                                        icon={<FaTrash className="text-red-500" />}
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Category Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <CategoryForm
                    category={editCategory}
                    categories={categories}
                    setCategories={setCategories}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
