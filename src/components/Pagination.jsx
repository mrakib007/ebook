import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginationButtons = getPaginationButtons();

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      {window.innerWidth >= 900 ? (
        // Full pagination buttons
        paginationButtons.map((pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex)}
            className={`px-3 py-1 mx-1 rounded ${
              pageIndex === currentPage
                ? "bg-[#FFDFCD] text-black"
                : "bg-white text-gray-700 hover:bg-gray-200"
            } ${pageIndex === currentPage ? "cursor-not-allowed" : ""}`}
            disabled={pageIndex === currentPage}
          >
            {pageIndex + 1}
          </button>
        ))
      ) : (
        // Compact "< >" navigation for smaller screens
        <div className="flex items-center">
          <button
            onClick={handlePrevClick}
            className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-200"
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <span className="px-3 py-1 mx-1">{currentPage + 1} / {totalPages}</span>
          <button
            onClick={handleNextClick}
            className="px-3 py-1 mx-1 rounded bg-white text-gray-700 hover:bg-gray-200"
            disabled={currentPage === totalPages - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
