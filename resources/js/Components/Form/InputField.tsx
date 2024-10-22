interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
}

export default function InputField({ label, name, type = 'text', value, onChange, error, placeholder, required = false }: InputFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder || ''}
                onChange={onChange}
                className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                required={required}
            />
            {error && <span className="text-red-500 text-sm dark:text-red-400">{error}</span>}
        </div>
    );
}
