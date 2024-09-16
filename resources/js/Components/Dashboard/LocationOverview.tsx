import React from 'react';

interface Location {
    name: string;
    capacity: number;
    itemsStored: number;
}

interface LocationOverviewProps {
    locations: Location[];
    searchQuery: string;
    filteredItems: { id: number; name: string; description: string; category: string; location: string }[];
}

export default function LocationOverview({ locations, searchQuery, filteredItems }: LocationOverviewProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                {searchQuery ? (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Search Results for "{searchQuery}"</h3>
                        {filteredItems.length > 0 ? (
                            <ul>
                                {filteredItems.map((item) => (
                                    <li key={item.id} className="mb-4 border-b pb-4">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                        <p>
                                            <span className="text-xs text-gray-500">Category:</span> {item.category}
                                        </p>
                                        <p>
                                            <span className="text-xs text-gray-500">Location:</span> {item.location}
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
                        {locations.length > 0 ? (
                            <ul>
                                {locations.map((location, index) => (
                                    <li key={index} className="mb-4">
                                        <h4 className="font-semibold">{location.name}</h4>
                                        <p>
                                            Items Stored: {location.itemsStored} / {location.capacity}
                                        </p>
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
    );
}
