import { PropsWithChildren } from 'react';

interface ButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    color?: string;
    name?: string;
}
const IconButton = ({ icon, onClick, className, type = 'button', color = 'gray-500', name = '' }: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={name}
            className={`text-${color} hover:text-${color} focus:outline-none transition ease-in-out duration-150 ${className}`}
        >
            {icon}
        </button>
    );
};

export default IconButton;
