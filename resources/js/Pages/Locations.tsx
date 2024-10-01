import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import ActionButton from '@/Components/ActionButton';
import LocationForm from '@/Components/Locations/LocationForm';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

    // Search, Pagination State, and Pagination Size
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage, setLocationsPerPage] = useState(5);
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

    useEffect(() => {
        const filtered = locations.filter(
            (location) =>
                location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLocations(filtered);
    }, [searchQuery, locations]);

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);
    const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

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

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleLocationsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocationsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getPaginationRange = () => {
        const range: number[] = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Locations</h2>}>
            <Head title="Locations" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        {/* Title, Search, Select, and Button in the Same Row on Desktop */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Location Settings</h3>

                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full md:w-auto">
                                <input
                                    type="text"
                                    className="w-full md:w-auto border border-gray-300 p-2 rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="flex space-x-2 w-full md:w-auto">
                                    <div className="relative w-full md:w-auto">
                                        <select
                                            className="block w-full md:w-auto px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none appearance-none pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={locationsPerPage}
                                            onChange={handleLocationsPerPageChange}
                                        >
                                            <option value={5}>Show 5</option>
                                            <option value={10}>Show 10</option>
                                            <option value={20}>Show 20</option>
                                        </select>
                                    </div>
                                    <ActionButton
                                        label="Create New"
                                        onClick={handleAddLocation}
                                        dataTestId="add-location-modal-button"
                                        className="flex items-center w-full md:w-auto justify-center px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark focus:outline-none"
                                    />
                                </div>
                            </div>
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
                                    {currentLocations.length > 0 ? (
                                        currentLocations.map((location) => (
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
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">
                                                No locations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Modern Pagination with Dots and Disabled Arrows */}
                        <div className="mt-4 flex justify-center space-x-2">
                            {/* Left Arrow */}
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md border ${
                                    currentPage === 1
                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <FaChevronLeft />
                            </button>

                            {/* First Page */}
                            {currentPage > 3 && (
                                <>
                                    <button
                                        onClick={() => paginate(1)}
                                        className="px-4 py-2 rounded-md border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                    >
                                        1
                                    </button>
                                    <span className="px-2 py-2">...</span>
                                </>
                            )}

                            {/* Page Numbers */}
                            {getPaginationRange().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => paginate(pageNumber)}
                                    className={`px-4 py-2 rounded-md border ${
                                        currentPage === pageNumber
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            {/* Last Page */}
                            {currentPage < totalPages - 2 && (
                                <>
                                    <span className="px-2 py-2">...</span>
                                    <button
                                        onClick={() => paginate(totalPages)}
                                        className="px-4 py-2 rounded-md border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}

                            {/* Right Arrow */}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md border ${
                                    currentPage === totalPages
                                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <FaChevronRight />
                            </button>
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
