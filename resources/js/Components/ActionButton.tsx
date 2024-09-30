import React from 'react';

interface ActionButtonProps {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    dataTestId?: string;
}

export default function ActionButton({ label, onClick, icon, className = '', dataTestId = '' }: ActionButtonProps) {
    return (
        <button
            className={`bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center ${className}`}
            onClick={onClick}
            data-testid={dataTestId}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
}
