import React from 'react';
import { useContext, useState, useEffect } from 'react';
import LocationOverview from './LocationOverview';
import RecentActivity from './RecentActivity';
import StatsCard from './StatsCard';
import { FaPlus, FaBoxOpen, FaHandHolding, FaExclamationCircle } from 'react-icons/fa';
import ActionButton from '../ActionButton';
import { SearchContext } from '../../Contexts/SearchContext';

export default function DashboardContent() {
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
            status: 'lent',
            dateAdded: '2023-10-02',
        },
        { id: 4, name: 'Coffee Mug', description: 'Ceramic mug', category: 'Kitchenware', location: 'Kitchen', dateAdded: '2023-09-30' },
    ];

    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        const results = items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(results);
    }, [searchQuery]);

    const totalItems = items.length;
    const lentOutItems = items.filter((item) => item.status === 'lent');
    const itemsNeedingRestock = items.filter((item) => item.dateAdded < '2023-09-01');

    const locations = [
        { name: 'Office', capacity: 10, itemsStored: 2 },
        { name: 'Living Room', capacity: 5, itemsStored: 1 },
        { name: 'Kitchen', capacity: 8, itemsStored: 1 },
    ];

    return (
        <div className="py-6">
            <div className=" bg-indigo-400"></div>
            <div className=" bg-orange-400"></div>
            <div className=" bg-red-400"></div>
            {/* Quick Stats Cards */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Items" icon={<FaBoxOpen />} bgColor="indigo-400" indicator={totalItems} />
                    <StatsCard title="Lent Out Items" icon={<FaHandHolding />} bgColor="indigo-400" indicator={lentOutItems.length} />
                    <StatsCard
                        title="Items Needing Restock"
                        icon={<FaExclamationCircle />}
                        bgColor="red-400"
                        indicator={itemsNeedingRestock.length}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    {/* Left Side - Locations or Search Results */}
                    <div className="w-full lg:w-4/5">
                        <LocationOverview locations={locations} searchQuery={searchQuery} filteredItems={filteredItems} />
                    </div>

                    {/* Right Side - Quick Actions and Recent Activity */}
                    <div className="w-full lg:w-1/5 mt-6 lg:mt-0 ">
                        <div className="flex mb-6 justify-center">
                            <ActionButton label="Add New Item" icon={<FaPlus />} className="w-full" />
                        </div>
                        <RecentActivity items={items} />
                    </div>
                </div>
            </div>
        </div>
    );
}
