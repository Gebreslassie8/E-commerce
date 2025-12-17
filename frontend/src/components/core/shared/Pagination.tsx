import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  siblingCount?: number;
  className?: string;
  compact?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = false,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  siblingCount = 1,
  className = '',
  compact = false,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1 && !showPageSize) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // + ellipsis on both sides

    if (totalPages <= totalBlocks) {
      // Show all pages if total pages is less than calculated blocks
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    // First page
    pages.push(1);

    // Left ellipsis
    if (showLeftEllipsis) pages.push('...');
    
    // Sibling pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    // Right ellipsis
    if (showRightEllipsis) pages.push('...');
    
    // Last page
    pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange?.(newSize);
    onPageChange(1); // Reset to first page when page size changes
  };

  const pageNumbers = getPageNumbers();
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Button base classes
  const buttonBaseClasses = "flex items-center justify-center min-w-[40px] h-10 px-3 border rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const pageButtonClasses = "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400";
  const activeButtonClasses = "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700";
  const navButtonClasses = "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400";

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Left section */}
      <div className="flex items-center gap-4">
        {showInfo && (
          <div className="text-sm text-gray-600 whitespace-nowrap">
            Showing <span className="font-semibold text-gray-900">{startItem.toLocaleString()}</span> –{' '}
            <span className="font-semibold text-gray-900">{endItem.toLocaleString()}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalItems.toLocaleString()}</span>
          </div>
        )}

        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="page-size" className="text-sm text-gray-600 whitespace-nowrap">
              Show:
            </label>
            <select
              id="page-size"
              value={itemsPerPage}
              onChange={handlePageSizeChange}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Items per page"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {!compact && totalPages > 1 && (
        <div className="flex items-center gap-1" role="navigation" aria-label="Pagination">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonBaseClasses} ${navButtonClasses}`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span 
                  className="flex items-center justify-center min-w-[40px] h-10 px-3 text-gray-400 select-none"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`${buttonBaseClasses} ${currentPage === page ? activeButtonClasses : pageButtonClasses}`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${buttonBaseClasses} ${navButtonClasses}`}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Compact version */}
      {compact && totalPages > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonBaseClasses} ${navButtonClasses}`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${buttonBaseClasses} ${navButtonClasses}`}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;