'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-100'
              } disabled:cursor-not-allowed`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>

      <span className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
