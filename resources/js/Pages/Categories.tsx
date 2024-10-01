import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Category } from '@/types';
import { usePaginationAndFiltering } from '@/hooks/usePaginationAndFiltering';
import IconButton from '@/Components/Buttons/IconButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import CategoryForm from '@/Components/Categories/CategoryForm';
import ListPageWrapper from '@/Components/CRUD/ListPageWrapper';

export default function Categories({ categories }: { categories: Category[] }) {
    const [showModal, setShowModal] = useState(false); // For handling the form modal
    const [editCategory, setEditCategory] = useState<Category | undefined>(); // For editing existing categories
    const {
        searchQuery,
        setSearchQuery,
        currentItems: currentCategories,
        currentPage,
        totalPages,
        itemsPerPageState: categoriesPerPage,
        paginate,
        handleItemsPerPageChange,
    } = usePaginationAndFiltering(categories, (category, query) => category.name.toLowerCase().includes(query.toLowerCase()));

    const handleAddCategory = () => {
        setShowModal(true);
        setEditCategory(undefined); // Reset for new category
    };

    const handleEditCategory = (category: Category) => {
        setEditCategory(category);
        setShowModal(true);
    };

    const handleDeleteCategory = (categoryId: number) => {
        router.delete(route('categories.destroy', categoryId));
    };

    const columns = ['id', 'name'] as Array<keyof Category>;

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Categories</h2>}>
            <Head title="Categories" />

            <ListPageWrapper
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                itemsPerPage={categoriesPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                handleAddItem={handleAddCategory}
                data={currentCategories}
                columns={columns}
                renderActions={(category) => (
                    <div className="flex space-x-4 justify-center">
                        <IconButton
                            icon={<FaEdit className="text-yellow-500" />}
                            onClick={() => handleEditCategory(category)}
                            name="Edit"
                        />
                        <IconButton
                            icon={<FaTrash className="text-red-500" />}
                            onClick={() => handleDeleteCategory(category.id)}
                            name="Delete"
                        />
                    </div>
                )}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />

            {/* Add/Edit Category Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <CategoryForm category={editCategory} closeModal={() => setShowModal(false)} />
            </Modal>
        </AuthenticatedLayout>
    );
}
