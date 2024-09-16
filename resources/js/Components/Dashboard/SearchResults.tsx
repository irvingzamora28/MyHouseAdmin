import React from 'react';

interface SearchResultsProps {
    searchQuery: string;
    filteredItems: { id: number; name: string; description: string; category: string; location: string }[];
}

export default function SearchResults({ searchQuery, filteredItems }: SearchResultsProps) {
    return (
        <div>
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
        </div>
    );
}
