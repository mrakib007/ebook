import { useState, useRef } from "react";
import useDataFetching from "../../hooks/useDataFetching";
import Controls from "../controlpanel/Controls";
import Pagination from "../../components/Pagination";

const Book = () => {
   const { data: book } = useDataFetching({
      queryKey: "books",
      endPoint: "/mastering-clean-code-a-comprehensive-guide",
   });

   const bookData = book?.ebookPages?.data.map((page) => ({
      id: page?.id,
      content: page?.htmlcontent,
   }));

   const [currentPage, setCurrentPage] = useState(0);
   const [isReading, setIsReading] = useState(false);
   const totalPages = bookData ? Math.ceil(bookData.length / 2) : 0;

   const leftContainerRef = useRef(null);
   const rightContainerRef = useRef(null);

   const leftPageIndex = currentPage * 2;
   const rightPageIndex = leftPageIndex + 1;

   const extractAndLogText = (htmlString) => {
      const formattedHtml = htmlString
         .replace(/<\/(div|p|li|ul|ol|h1|h2|h3|h4|h5|h6)>/g, "</$1>\n")
         .replace(/<(div|p|li|ul|ol|h1|h2|h3|h4|h5|h6)>/g, "\n<$1>")
         .replace(/<br\s*\/?>/gi, "\n");

      const plainString = formattedHtml.replace(/<[^>]+>/g, "").trim();
      const lines = plainString
         .split("\n")
         .filter((line) => line.trim() !== "");

      return lines;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      stopReading(); // this will stop reading when page is changed
   };

   const startReading = () => {
      setIsReading(true);
      const leftPageText = leftContainerRef.current
         ? extractAndLogText(leftContainerRef.current.innerHTML)
         : [];
      const rightPageText = rightContainerRef.current
         ? extractAndLogText(rightContainerRef.current.innerHTML)
         : [];

      const linesToRead = [...leftPageText, ...rightPageText];

      linesToRead.forEach((line, index) => {
         const utterance = new SpeechSynthesisUtterance(line.trim());
         utterance.rate = 1;
         utterance.pitch = 1;

         window.speechSynthesis.speak(utterance);
      });
   };

   const stopReading = () => {
      window.speechSynthesis.cancel();
      setIsReading(false);
   };

   const toggleReading = () => {
      if (isReading) {
         stopReading();
      } else {
         startReading();
      }
   };

   return (
      <div className="relative h-screen grid grid-rows-12">
         {/* Main content area */}
         <div className="row-span-10 overflow-hidden">
            <div className="h-full flex items-start justify-center">
               <div className="flex-1 pb-4 flex justify-center">
                  {bookData && leftPageIndex < bookData.length && (
                     <div
                        className="bg-white p-4 shadow-md rounded-lg w-[600px] h-[790px] overflow-auto"
                        ref={leftContainerRef}
                        dangerouslySetInnerHTML={{
                           __html: bookData[leftPageIndex].content,
                        }}
                     />
                  )}
                  {bookData && rightPageIndex < bookData.length && (
                     <div
                        className="bg-white p-4 shadow-md rounded-lg w-[595px] h-[790px] overflow-auto"
                        ref={rightContainerRef}
                        dangerouslySetInnerHTML={{
                           __html: bookData[rightPageIndex].content,
                        }}
                     />
                  )}
               </div>
            </div>
         </div>

         {/* Container for Pagination and Controls */}
         <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            {/* Pagination */}
            <div className="w-full">
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
               />
            </div>
            {/* Controls */}
            <div className="w-full bg-[#FFDFCD]">
               <Controls toggleReading={toggleReading} isReading={isReading} />
            </div>
         </div>
      </div>
   );
};

export default Book;
