import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

import Modal from '@/Components/Modal'; // Use the Laravel Breeze Modal
import ActionButton from '@/Components/ActionButton';
import LocationForm from '@/Components/Locations/LocationForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import React, { PropsWithChildren } from 'react';
import { Location } from '@/types';

interface ButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    color?: string;
    name?: string;
}
const IconButton = ({ icon, onClick, className, type = 'button', color = 'gray-500', name = '' }: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={name}
            className={`text-${color} hover:text-${color} focus:outline-none transition ease-in-out duration-150 ${className}`}
        >
            {icon}
        </button>
    );
};

export default function Locations({ locations }: { locations: Location[] }) {
    const [showModal, setShowModal] = useState(false);
    const [editLocation, setEditLocation] = useState<Location | undefined>();

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

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Locations</h2>}>
            <Head title="Locations" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Location List</h3>
                            <ActionButton
                                label="Add Location"
                                onClick={handleAddLocation}
                                className="bg-indigo-500 hover:bg-indigo-600"
                                dataTestId="add-location-modal-button"
                            />
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-gray-800 dark:text-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-start">#</th>
                                        <th className="px-4 py-2 text-start">Name</th>
                                        <th className="px-4 py-2 hidden sm:table-cell text-start">Description</th>
                                        <th className="px-4 py-2 hidden md:table-cell text-start">Parent Location</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations &&
                                        locations.map((location) => (
                                            <tr key={location.id}>
                                                <td className="px-4 py-2">{location.id}</td>
                                                <td className="px-4 py-2">{location.name}</td>
                                                <td className="px-4 py-2 hidden sm:table-cell">{location.description || 'N/A'}</td>
                                                <td className="px-4 py-2 hidden md:table-cell">
                                                    {location.parent ? location.parent.name : 'No Parent'}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex space-x-4 justify-center">
                                                        <IconButton
                                                            icon={<FaEdit className="text-yellow-500" />}
                                                            onClick={() => handleEditLocation(location)}
                                                            className="mr-2"
                                                            name="Edit"
                                                        />
                                                        <IconButton
                                                            icon={<FaTrash className="text-red-500" />}
                                                            onClick={() => handleDeleteLocation(location.id)}
                                                            name="Delete"
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

            {/* Add/Edit Location Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="md">
                <LocationForm location={editLocation} closeModal={() => setShowModal(false)} />
            </Modal>
        </AuthenticatedLayout>
    );
}
