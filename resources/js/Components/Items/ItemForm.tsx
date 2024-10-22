import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ActionButton from '../ActionButton';
import TextInputField from '../Form/TextInputField';
import TextareaField from '../Form/TextareaInputField';
import SelectInputField from '../Form/SelectInputField';
import { Category, Location, Item } from '@/types';
import InputField from '../Form/InputField';

interface ItemFormProps {
    item?: Item;
    closeModal: () => void;
}

export default function ItemForm({ item, closeModal }: ItemFormProps) {
    const { data, setData, post, put, errors, reset } = useForm({
        name: item ? item.name : '',
        description: item ? item.description : '',
        category_id: item ? item.category_id : '',
        location_id: item ? item.location_id : '',
        value: item ? item.value : '',
        purchase_date: item ? item.purchase_date : '',
        warranty_info: item ? item.warranty_info : '',
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchCategoriesAndLocations = async () => {
            try {
                const categoryResponse = await fetch(route('categories.index'));
                console.log(categoryResponse);

                const categories = await categoryResponse.json();
                setCategories(categories.data);

                const locationResponse = await fetch(route('locations.index'));
                const locations = await locationResponse.json();
                setLocations(locations.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCategoriesAndLocations();
    }, []);

    const handleUpdateOrAdd = () => {
        if (item) {
            put(route('items.update', item.id), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        } else {
            post(route('items.store'), {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            });
        }
    };

    return (
        <div className="p-8">
            <TextInputField
                label="Item Name"
                name="name"
                value={data.name}
                placeholder="Item Name"
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
            />

            <TextareaField
                label="Description"
                placeholder="Item Description"
                name="description"
                value={data.description || ''}
                onChange={(e) => setData('description', e.target.value)}
                error={errors.description}
            />

            <SelectInputField
                label="Category"
                name="category_id"
                value={data.category_id || ''}
                onChange={(e) => setData('category_id', e.target.value)}
                options={categories}
                error={errors.category_id}
            />

            <SelectInputField
                label="Location"
                name="location_id"
                value={data.location_id || ''}
                onChange={(e) => setData('location_id', e.target.value)}
                options={locations}
                error={errors.location_id}
            />

            <TextInputField
                label="Value"
                name="value"
                value={data.value || ''}
                placeholder="Item Value"
                onChange={(e) => setData('value', e.target.value)}
                error={errors.value}
            />

            <InputField
                label="Purchase Date"
                name="purchase_date"
                type="date"
                value={data.purchase_date || ''}
                onChange={(e) => setData('purchase_date', e.target.value)}
                error={errors.purchase_date}
            />

            <TextareaField
                label="Warranty Info"
                name="warranty_info"
                value={data.warranty_info || ''}
                onChange={(e) => setData('warranty_info', e.target.value)}
                error={errors.warranty_info}
            />

            <div className="flex justify-end">
                <ActionButton label="Cancel" onClick={closeModal} className="mr-2 bg-gray-500 hover:bg-gray-600" />
                <ActionButton
                    label={item ? 'Update Item' : 'Add Item'}
                    onClick={handleUpdateOrAdd}
                    className="bg-indigo-500 hover:bg-indigo-600"
                />
            </div>
        </div>
    );
}
