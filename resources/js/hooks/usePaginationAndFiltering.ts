import { useState, useEffect } from 'react';

export function usePaginationAndFiltering<T>(items: T[], filterFn: (item: T, query: string) => boolean, itemsPerPage = 5) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
    const [filteredItems, setFilteredItems] = useState<T[]>([]);

    useEffect(() => {
        const filtered = items.filter((item) => filterFn(item, searchQuery));
        setFilteredItems(filtered);
        if (searchQuery) {
            setCurrentPage(1); // Reset page on new search
        }
    }, [searchQuery, items]);

    const indexOfLastItem = currentPage * itemsPerPageState;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageState;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPageState);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPageState(value);
        setCurrentPage(1);
    };

    return {
        searchQuery,
        setSearchQuery,
        currentItems,
        currentPage,
        totalPages,
        itemsPerPageState,
        paginate,
        handleItemsPerPageChange,
    };
}
