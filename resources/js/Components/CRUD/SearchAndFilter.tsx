import ActionButton from '../ActionButton';

interface SearchAndFilterProps {
    title?: string;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    itemsPerPage: number;
    handleItemsPerPageChange: (value: number) => void;
    handleAddItem: () => void;
}

const SearchAndFilter = ({
    title,
    searchQuery,
    setSearchQuery,
    itemsPerPage,
    handleItemsPerPageChange,
    handleAddItem,
}: SearchAndFilterProps) => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 w-full md:w-auto">
                <input
                    type="text"
                    className="w-full md:w-auto border border-gray-300 p-2 rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex space-x-2 w-full md:w-auto">
                    <div className="relative w-full md:w-auto">
                        <select
                            className="block w-full md:w-auto px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none appearance-none pr-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        >
                            <option value={5}>Show 5</option>
                            <option value={10}>Show 10</option>
                            <option value={20}>Show 20</option>
                        </select>
                    </div>
                    <ActionButton
                        label="Create New"
                        onClick={handleAddItem}
                        dataTestId="add-location-modal-button"
                        className="flex items-center w-full md:w-auto justify-center px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilter;
