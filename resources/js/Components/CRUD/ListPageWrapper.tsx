import DynamicTable from './DynamicTable';
import Pagination from './Pagination';
import SearchAndFilter from './SearchAndFilter';

interface ListPageWrapperProps<T> {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    itemsPerPage: number;
    handleItemsPerPageChange: (value: number) => void;
    handleAddItem: () => void;
    data: T[];
    columns: Array<keyof T>;
    renderActions: (item: T) => React.ReactNode;
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
}

const ListPageWrapper = <T extends object>({
    searchQuery,
    setSearchQuery,
    itemsPerPage,
    handleItemsPerPageChange,
    handleAddItem,
    data,
    columns,
    renderActions,
    currentPage,
    totalPages,
    paginate,
}: ListPageWrapperProps<T>) => {
    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <SearchAndFilter
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        itemsPerPage={itemsPerPage}
                        handleItemsPerPageChange={handleItemsPerPageChange}
                        handleAddItem={handleAddItem}
                    />

                    <DynamicTable data={data} columns={columns} renderActions={renderActions} />

                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </div>
            </div>
        </div>
    );
};

export default ListPageWrapper;
