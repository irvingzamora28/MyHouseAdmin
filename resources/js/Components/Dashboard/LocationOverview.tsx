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
        <div className="bg-white dark:bg-neutral-dark text-neutral-contentLight dark:text-neutral-contentDark shadow-card rounded-lg overflow-hidden">
            <div className="p-6">
                {searchQuery ? (
                    <>
                        <h3 className="text-lg font-semibold mb-4">Search Results for "{searchQuery}"</h3>
                        {filteredItems.length > 0 ? (
                            <ul>
                                {filteredItems.map((item) => (
                                    <li key={item.id} className="mb-4 border-b pb-4">
                                        <h4 className="font-semibold text-gray-600">{item.name}</h4>
                                        <p className="text-sm">{item.description}</p>
                                        <p>
                                            <span className="text-xs">Category:</span> {item.category}
                                        </p>
                                        <p>
                                            <span className="text-xs">Location:</span> {item.location}
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
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Locations Overview</h3>
                        {locations.length > 0 ? (
                            <ul>
                                {locations.map((location, index) => (
                                    <li key={index} className="mb-4">
                                        <h4 className="font-semibold text-gray-600">{location.name}</h4>
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
