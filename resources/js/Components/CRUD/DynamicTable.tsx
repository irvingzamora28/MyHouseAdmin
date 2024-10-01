interface TableProps<T> {
    data: T[];
    columns: Array<keyof T>;
    renderActions?: (item: T) => React.ReactNode;
}

const DynamicTable = <T extends object>({ data, columns, renderActions }: TableProps<T>) => {
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
                                        {String(item[col])}
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
