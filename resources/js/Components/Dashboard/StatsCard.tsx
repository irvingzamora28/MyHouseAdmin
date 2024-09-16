import React from 'react';

interface StatsCardProps {
    title: string;
    value?: number | string;
    icon?: React.ReactNode;
    bgColor: string;
    indicator?: string | number;
    indicatorColor?: string;
}

export default function StatsCard({ title, value, icon, bgColor, indicator, indicatorColor }: StatsCardProps) {
    const hasValue = value !== undefined;

    return (
        <div className="bg-white text-gray-700 shadow-md rounded-lg overflow-hidden border border-gray-200 relative">
            <div className={`p-4 ${!hasValue ? 'flex items-center justify-between h-24' : ''}`}>
                <div className="flex justify-between items-center w-full">
                    {/* Left Side with Icon and Title */}
                    <div className={`flex items-center ${!hasValue ? 'justify-center w-full' : ''}`}>
                        {icon && (
                            <div className="text-2xl mr-4 p-3 rounded-full">
                                <span>{icon}</span>
                            </div>
                        )}
                        <div className={hasValue ? '' : 'text-start w-full'}>
                            <h3 className={`font-medium ${hasValue ? 'text-md' : 'text-xl'} text-gray-500`}>{title}</h3>
                            {hasValue && <p className="text-2xl font-bold">{value}</p>}
                        </div>
                    </div>

                    {/* Optional Right Side with Circular Indicator */}
                    {indicator !== undefined && (
                        <div
                            className={`text-${indicatorColor} border-2 border-${indicatorColor} rounded-full h-10 w-10 flex items-center justify-center px-4`}
                        >
                            <span className="text-lg font-semibold">{indicator}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Colored Line */}
            <div className={`w-full h-2 bg-${bgColor} absolute bottom-0 left-0`}></div>
        </div>
    );
}
