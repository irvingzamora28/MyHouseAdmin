import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, paginate }: PaginationProps) => {
    const getPaginationRange = () => {
        const range: number[] = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="mt-4 flex justify-center space-x-2">
            {/* Left Arrow */}
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border ${
                    currentPage === 1
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
                <FaChevronLeft />
            </button>

            {/* First Page */}
            {currentPage > 3 && (
                <>
                    <button
                        onClick={() => paginate(1)}
                        className="px-4 py-2 rounded-md border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    >
                        1
                    </button>
                    <span className="px-2 py-2">...</span>
                </>
            )}

            {/* Page Numbers */}
            {getPaginationRange().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-4 py-2 rounded-md border ${
                        currentPage === pageNumber ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Last Page */}
            {currentPage < totalPages - 2 && (
                <>
                    <span className="px-2 py-2">...</span>
                    <button
                        onClick={() => paginate(totalPages)}
                        className="px-4 py-2 rounded-md border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Right Arrow */}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border ${
                    currentPage === totalPages
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
