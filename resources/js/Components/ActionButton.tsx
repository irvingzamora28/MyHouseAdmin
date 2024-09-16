import React from 'react';

interface ActionButtonProps {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

export default function ActionButton({ label, onClick, icon, className = '' }: ActionButtonProps) {
    return (
        <button
            className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center ${className}`}
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
}
