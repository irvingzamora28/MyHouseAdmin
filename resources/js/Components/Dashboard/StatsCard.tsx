import React from 'react';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
    bgColor: string;
}

export default function StatsCard({ title, value, icon, bgColor }: StatsCardProps) {
    return (
        <div className={`bg-gradient-to-r ${bgColor} text-white shadow-md rounded-lg overflow-hidden`}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                        {icon && <span className="mr-2">{icon}</span>} {title}
                    </h3>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );
}
