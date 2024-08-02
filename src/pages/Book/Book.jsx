import React, { useState, useRef } from 'react';
import useDataFetching from "../../hooks/useDataFetching";
import Controls from "../controlpanel/Controls";

const Book = () => {
   const { data: book } = useDataFetching({
      queryKey: "books",
      endPoint: "/mastering-clean-code-a-comprehensive-guide",
   });

   const bookData = book?.ebookPages?.data.map((page) => ({
      id: page?.id,
      content: page?.htmlcontent,
   }));
   console.log(bookData);
   // Assuming `leftPageIndex` and `rightPageIndex` are controlled via state
   const [leftPageIndex, setLeftPageIndex] = useState(0);
   const [rightPageIndex, setRightPageIndex] = useState(1);
   const [canGoToNextPage, setCanGoToNextPage] = useState(true);


   // Refs for page containers
   const leftContainerRef = useRef(null);
   const rightContainerRef = useRef(null);

   return (
      <div className="h-screen grid grid-rows-12 md:grid-rows-12">
         {/* Main Content Area (spanning 10 rows on md and above, 9 rows below md) */}
         <div className="row-span-9 md:row-span-10 bg-gray-200">
            <div className="h-full flex items-center justify-center">
               <div className="flex-1 pb-4 flex justify-center">
                  {bookData && leftPageIndex >= 0 && leftPageIndex < bookData.length && (
                     <div
                        className="bg-white p-4 shadow-md rounded-lg w-[600px] h-[790px] overflow-auto"
                        ref={leftContainerRef}
                        dangerouslySetInnerHTML={{ __html: bookData[leftPageIndex].content }}
                     />
                  )}
                  {bookData && canGoToNextPage && (
                     <div
                        className="bg-white p-4 shadow-md rounded-lg w-[595px] h-[790px] overflow-auto"
                        ref={rightContainerRef}
                        dangerouslySetInnerHTML={{ __html: bookData[rightPageIndex].content }}
                     />
                  )}
               </div>
            </div>
         </div>

         {/* Second Section (spanning 1 row on all devices) */}
         <div className="row-span-1 bg-blue-200">
            <div className="h-full flex items-center justify-center">
               <p className="text-lg">Second Section (1 row)</p>
            </div>
         </div>

         {/* Third Section (spanning 2 rows below md, 1 row on md and above) */}
         <div className="row-span-2 md:row-span-1 bg-[#FFDFCD]">
            <div className="h-full flex items-center justify-center">
               <Controls />
            </div>
         </div>
      </div>
   );
};

export default Book;
