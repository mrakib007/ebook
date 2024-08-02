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

   return (
      <div className="flex justify-center">
         {paginationButtons.map((pageIndex) => (
            <button
               key={pageIndex}
               onClick={() => handlePageChange(pageIndex)}
               className={`px-3 py-1 mx-1 rounded ${
                  pageIndex === currentPage
                     ? "bg-[#FFDFCD] text-black"
                     : "bg-white text-gray-700 hover:bg-gray-200"
               } ${
                  pageIndex === currentPage
                     ? "cursor-not-allowed text-gray-300"
                     : ""
               }`}
               disabled={pageIndex === currentPage}
            >
               {pageIndex + 1}
            </button>
         ))}
      </div>
   );
};

export default Pagination;
