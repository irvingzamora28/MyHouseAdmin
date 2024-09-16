import { useContext, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SearchContext } from '@/Contexts/SearchContext';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />
            <DashboardContent />
        </AuthenticatedLayout>
    );
}

function DashboardContent() {
    const { searchQuery } = useContext(SearchContext);

    // Dummy data with dateAdded field
    const items = [
        { id: 1, name: 'Laptop', description: 'MacBook Pro', category: 'Electronics', location: 'Office', dateAdded: '2023-10-01' },
        { id: 2, name: 'Office Chair', description: 'Ergonomic chair', category: 'Furniture', location: 'Office', dateAdded: '2023-09-28' },
        {
            id: 3,
            name: 'Headphones',
            description: 'Noise-cancelling',
            category: 'Electronics',
            location: 'Living Room',
            dateAdded: '2023-10-02',
        },
        { id: 4, name: 'Coffee Mug', description: 'Ceramic mug', category: 'Kitchenware', location: 'Kitchen', dateAdded: '2023-09-30' },
        // Add more dummy items as needed
    ];

    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        // Filter items based on the search query
        const results = items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(results);
    }, [searchQuery]);

    // Calculate Quick Stats
    const totalItems = items.length;
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    const uniqueLocations = [...new Set(items.map((item) => item.location))];

    // Calculate Items by Location
    const itemsByLocation = items.reduce<Record<string, number>>((acc, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
    }, {});

    // Locations Overview Data
    const locations = [
        { name: 'Office', capacity: 10, itemsStored: itemsByLocation['Office'] || 0 },
        { name: 'Living Room', capacity: 5, itemsStored: itemsByLocation['Living Room'] || 0 },
        { name: 'Kitchen', capacity: 8, itemsStored: itemsByLocation['Kitchen'] || 0 },
        // Add more locations as needed
    ];

    return (
        <div className="py-6">
            {/* Quick Stats Cards */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Total Items */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold">Total Items</h3>
                            <p className="mt-2 text-3xl font-bold">{totalItems}</p>
                        </div>
                    </div>
                    {/* Total Categories */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold">Categories</h3>
                            <p className="mt-2 text-3xl font-bold">{uniqueCategories.length}</p>
                        </div>
                    </div>
                    {/* Total Locations */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold">Locations</h3>
                            <p className="mt-2 text-3xl font-bold">{uniqueLocations.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    {/* Left Side - Overview of Locations or Search Results */}
                    <div className="w-full lg:w-4/5">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {searchQuery ? (
                                    <>
                                        <h3 className="text-lg font-semibold mb-4">Search Results for "{searchQuery}":</h3>
                                        {filteredItems.length > 0 ? (
                                            <ul>
                                                {filteredItems.map((item) => (
                                                    <li key={item.id} className="mb-4">
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p>{item.description}</p>
                                                        <p>
                                                            <span className="text-sm text-gray-500">Category:</span> {item.category}
                                                        </p>
                                                        <p>
                                                            <span className="text-sm text-gray-500">Location:</span> {item.location}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No items found.</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold mb-4">Locations Overview</h3>
                                        {/* Display the overview of locations */}
                                        {locations.length > 0 ? (
                                            <ul>
                                                {locations.map((location, index) => (
                                                    <li key={index} className="mb-4">
                                                        <h4 className="font-semibold">{location.name}</h4>
                                                        <p>
                                                            Items Stored: {location.itemsStored} / {location.capacity}
                                                        </p>
                                                        {/* You can add more details or status indicators */}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No locations found.</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Quick Actions and Recent Activity */}
                    <div className="w-full lg:w-1/5 mt-6 lg:mt-0">
                        {/* Quick Actions */}
                        <div className="mb-6">
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                                + Add New Item
                            </button>
                        </div>
                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                {/* Display recent items */}
                                {items.length > 0 ? (
                                    <ul>
                                        {items
                                            .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                                            .slice(0, 5)
                                            .map((item) => (
                                                <li key={item.id} className="mb-4">
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">Added on {item.dateAdded}</p>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <p>No recent activity.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
