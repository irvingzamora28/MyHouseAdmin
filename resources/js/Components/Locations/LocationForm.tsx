import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ActionButton from '../ActionButton';
import TextInputField from '../Form/TextInputField';
import TextareaField from '../Form/TextareaInputField';
import SelectInputField from '../Form/SelectInputField';

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
            <TextInputField
                label="Location Name"
                name="name"
                value={data.name}
                placeholder="Location Name"
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
            />

            <TextareaField
                label="Description"
                placeholder="Location Description"
                name="description"
                value={data.description || ''}
                onChange={(e) => setData('description', e.target.value)}
                error={errors.description}
            />

            <SelectInputField
                label="Parent Location"
                name="parent_id"
                value={data.parent_id || ''}
                onChange={(e) => setData('parent_id', e.target.value)}
                options={parentLocations}
                error={errors.parent_id}
            />

            <div className="flex justify-end">
                <ActionButton label="Cancel" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600" />
                <ActionButton label={location ? 'Update Location' : 'Add Location'} className="bg-indigo-500 hover:bg-indigo-600" />
            </div>
        </form>
    );
}
