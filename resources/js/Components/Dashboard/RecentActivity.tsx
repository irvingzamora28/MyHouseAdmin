import React from 'react';

interface RecentActivityProps {
    items: { id: number; name: string; dateAdded: string }[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
                {items.length > 0 ? (
                    <ul>
                        {items.map((item) => (
                            <li key={item.id} className="mb-4">
                                <h4 className="font-semibold text-gray-600">{item.name}</h4>
                                <p className="text-sm text-gray-500">Added on {item.dateAdded}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent activity.</p>
                )}
            </div>
        </div>
    );
}
