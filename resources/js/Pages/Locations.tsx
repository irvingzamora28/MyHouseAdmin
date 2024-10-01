import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import LocationForm from '@/Components/Locations/LocationForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Location } from '@/types';
import IconButton from '@/Components/Buttons/IconButton';
import { usePaginationAndFiltering } from '@/hooks/usePaginationAndFiltering';
import ListPageWrapper from '@/Components/CRUD/ListPageWrapper';

export default function Locations({ locations }: { locations: Location[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editLocation, setEditLocation] = useState<Location | undefined>();

    const {
        searchQuery,
        setSearchQuery,
        currentItems: currentLocations,
        currentPage,
        totalPages,
        itemsPerPageState: locationsPerPage,
        paginate,
        handleItemsPerPageChange,
    } = usePaginationAndFiltering(
        locations,
        (location, query) =>
            location.name.toLowerCase().includes(query.toLowerCase()) ||
            (location.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
    );

    const handleAddLocation = () => {
        setShowModal(true);
        setEditLocation(undefined);
    };

    const handleEditLocation = (location: Location) => {
        setEditLocation(location);
        setShowModal(true);
    };

    const handleDeleteLocation = (locationId: number) => {
        router.delete(route('locations.destroy', locationId));
    };

    const columns = ['id', 'name', 'description', 'parent'] as Array<keyof Location>;

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Locations</h2>}>
            <Head title="Locations" />

            <ListPageWrapper
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                itemsPerPage={locationsPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                handleAddItem={handleAddLocation}
                data={currentLocations}
                columns={columns}
                renderActions={(location) => (
                    <div className="flex space-x-4 justify-center">
                        <IconButton
                            icon={<FaEdit className="text-yellow-500" />}
                            onClick={() => handleEditLocation(location)}
                            name="Edit"
                        />
                        <IconButton
                            icon={<FaTrash className="text-red-500" />}
                            onClick={() => handleDeleteLocation(location.id)}
                            name="Delete"
                        />
                    </div>
                )}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <LocationForm location={editLocation} closeModal={() => setShowModal(false)} />
            </Modal>
        </AuthenticatedLayout>
    );
}
