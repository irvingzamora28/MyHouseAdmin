interface SelectInputFieldProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { id: number; name: string }[];
    error?: string;
}

export default function SelectInputField({ label, name, value, onChange, options, error }: SelectInputFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
            >
                <option value="">No Parent</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-sm dark:text-red-400">{error}</span>}
        </div>
    );
}
