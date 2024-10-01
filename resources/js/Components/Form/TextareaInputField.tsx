interface TextareaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    placeholder?: string;
}

export default function TextareaField({ label, name, value, onChange, error, placeholder }: TextareaFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder || ''}
                onChange={onChange}
                className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
            />
            {error && <span className="text-red-500 text-sm dark:text-red-400">{error}</span>}
        </div>
    );
}
