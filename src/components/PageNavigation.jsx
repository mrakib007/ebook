// NavigationButtons.js
import React from 'react';
import { Icon } from '@iconify/react';

const PageNavigation = ({ currentPage, totalPages, onPrevClick, onNextClick }) => {
  return (
    <>
      {currentPage > 0 && (
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#FF9248] text-black rounded-full shadow-md"
          onClick={onPrevClick}
        >
          <Icon icon="ri:arrow-left-line" />
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-[#FF9248] text-black rounded-full shadow-md"
          onClick={onNextClick}
        >
         <Icon icon="ri:arrow-right-line" />
        </button>
      )}
    </>
  );
};

export default PageNavigation;
