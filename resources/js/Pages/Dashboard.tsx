import React, { useContext, useState, useEffect } from 'react';
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

    // Dummy data
    const items = [
        { id: 1, name: 'Laptop', description: 'MacBook Pro', category: 'Electronics', location: 'Office' },
        { id: 2, name: 'Office Chair', description: 'Ergonomic chair', category: 'Furniture', location: 'Office' },
        { id: 3, name: 'Headphones', description: 'Noise-cancelling', category: 'Electronics', location: 'Living Room' },
        { id: 4, name: 'Coffee Mug', description: 'Ceramic mug', category: 'Kitchenware', location: 'Kitchen' },
    ];

    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        // Filter items based on the search query
        console.log(searchQuery);

        const results = items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(results);
    }, [searchQuery]);

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display search results */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {searchQuery ? (
                            <h3 className="text-lg font-semibold mb-4">Search Results for "{searchQuery}":</h3>
                        ) : (
                            <h3 className="text-lg font-semibold mb-4">All Items:</h3>
                        )}

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
                    </div>
                </div>
            </div>
        </div>
    );
}
