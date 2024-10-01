import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ActionButton from '../ActionButton';

interface Location {
    id: number;
    name: string;
    description?: string;
    parent_id?: number;
}

interface LocationFormProps {
    location?: Location;
    closeModal: () => void;
}

export default function LocationForm({ location, closeModal }: LocationFormProps) {
    const { data, setData, post, put, errors, reset } = useForm({
        name: location ? location.name : '',
        description: location ? location.description : '',
        parent_id: location ? location.parent_id : '',
    });

    const [parentLocations, setParentLocations] = useState<Location[]>([]);

    useEffect(() => {
        // Fetch valid parent locations when the modal opens
        const fetchParentLocations = async () => {
            try {
                const response = await fetch(route('locations.parent-locations', location?.id ?? 0));
                const result = await response.json();
                setParentLocations(result);
            } catch (error) {
                console.error('Error fetching parent locations:', error);
            }
        };

        fetchParentLocations();
    }, [location]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (location) {
            put(route('locations.update', location.id), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        } else {
            post(route('locations.store'), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8">
            {/* Name field */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Location Name</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                    required
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Description field */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>

            {/* Parent location field */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Parent Location</label>
                <select
                    name="parent_id"
                    value={data.parent_id || ''}
                    onChange={(e) => setData('parent_id', e.target.value)}
                    className={`w-full px-4 py-2 border ${errors.parent_id ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                >
                    <option value="">No Parent</option>
                    {parentLocations.map((parentLocation) => (
                        <option key={parentLocation.id} value={parentLocation.id}>
                            {parentLocation.name}
                        </option>
                    ))}
                </select>
                {errors.parent_id && <span className="text-red-500 text-sm">{errors.parent_id}</span>}
            </div>

            <div className="flex justify-end">
                <ActionButton label="Cancel" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600" />
                <ActionButton label={location ? 'Update Location' : 'Add Location'} className="bg-indigo-500 hover:bg-indigo-600" />
            </div>
        </form>
    );
}
