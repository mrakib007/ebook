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

   const [leftPageIndex, setLeftPageIndex] = useState(0);
   const [rightPageIndex, setRightPageIndex] = useState(1);
   const [canGoToNextPage, setCanGoToNextPage] = useState(true);


   const leftContainerRef = useRef(null);
   const rightContainerRef = useRef(null);

   return (
      <div className="h-screen grid grid-rows-12 md:grid-rows-12">
         {/* 10 rows for big devices, 9 rows for md and lower devices */}
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

         {/* 1 row for pagination and it will stay same */}
         <div className="row-span-1 bg-blue-200">
            <div className="h-full flex items-center justify-center">
               <p className="text-lg">Second Section (1 row)</p>
            </div>
         </div>

         {/*it will take 2 row and 1 row depending on the device sizes*/}
         <div className="row-span-2 md:row-span-1 bg-[#FFDFCD]">
            <div className="h-full flex items-center justify-center">
               <Controls />
            </div>
         </div>
      </div>
   );
};

export default Book;
