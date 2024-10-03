import React from 'react';
import { LocationType } from '@/types';
import LocationTypeIcon from './LocationTypeIcon';

interface LocationTypeSelectProps {
    locationTypes: LocationType[];
    value: number | '';
    onChange: (value: number) => void;
    error?: string;
}

const LocationTypeSelect: React.FC<LocationTypeSelectProps> = ({ locationTypes, value, onChange, error }) => {
    const getLocationTypeById = (id: number) => {
        return locationTypes.find((type) => type.id === id);
    };

    const getIconName = (id: number) => {
        const locationType = getLocationTypeById(id);
        return locationType ? locationType.icon_name : '';
    };

    const getLocationTypeName = (id: number) => {
        const locationType = getLocationTypeById(id);
        return locationType ? locationType.name : '';
    };

    return (
        <div className="mb-4">
            <label htmlFor="location_type_id" className="block text-gray-700 font-medium mb-2">
                Location Type
            </label>
            <div className="relative">
                <select
                    id="location_type_id"
                    name="location_type_id"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`block appearance-none w-full bg-white border ${
                        error ? 'border-red-500' : 'border-gray-400'
                    } hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
                >
                    <option value="">Select a location type</option>
                    {locationTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* Optional: Add an icon here if desired */}
                </div>
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {/* Display selected icon */}
            {value && (
                <div className="mt-2 flex items-center">
                    <LocationTypeIcon iconName={getIconName(value)} />
                    <span className="ml-2">{getLocationTypeName(value)}</span>
                </div>
            )}
        </div>
    );
};

export default LocationTypeSelect;
