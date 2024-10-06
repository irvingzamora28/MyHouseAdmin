import { Icon } from '@/types';
import LocationTypeIcon from '../Locations/LocationTypeIcon';

interface TableProps<T> {
    data: T[];
    columns: Array<keyof T>;
    renderActions?: (item: T) => React.ReactNode;
}

const DynamicTable = <T extends { icon?: Icon; name?: string }>({ data, columns, renderActions }: TableProps<T>) => {
    const getDisplayValue = (value: any) => {
        if (typeof value === 'object' && value !== null) {
            return value.name ?? 'Parent';
        }
        if (value === null) {
            return '';
        }
        // If the value is not an object, display it as is
        return String(value);
    };

    const renderCellWithIcon = (item: T, column: keyof T) => {
        // Check if the column is 'name' and if the item contains an 'icon' object
        if (column === 'name' && item.icon && item.icon.icon_name) {
            return (
                <div className="flex items-center">
                    <LocationTypeIcon iconName={item.icon.icon_name} />
                    <span className="ml-2">{getDisplayValue(item[column], item)}</span>
                </div>
            );
        }
        return getDisplayValue(item[column], item);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-gray-800 dark:text-gray-200">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 text-start">
                                {String(col).toUpperCase()}
                            </th>
                        ))}
                        {renderActions && <th className="px-4 py-2 text-center">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2">
                                        {renderCellWithIcon(item, col)}
                                    </td>
                                ))}
                                {renderActions && <td className="px-4 py-2 text-center">{renderActions(item)}</td>}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-4">
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
