import { useState, useRef } from "react";
import useDataFetching from "../../hooks/useDataFetching";
import Controls from "../controlpanel/Controls";
import Pagination from "../../components/Pagination";
import useResize from "../../hooks/useResize";
import { takeScreenshot } from "../../utility/screenshotUtil"; // Import the screenshot utility

const Book = () => {
   const { data: book } = useDataFetching({
      queryKey: "books",
      endPoint: "/mastering-clean-code-a-comprehensive-guide",
   });

   const { isSinglePageView, scale, scaleY } = useResize();

   const bookData = book?.ebookPages?.data.map((page) => ({
      id: page?.id,
      content: page?.htmlcontent,
   }));

   const [currentPage, setCurrentPage] = useState(0);
   const [isReading, setIsReading] = useState(false);
   const [pageHistory, setPageHistory] = useState([]); // Track page history

   const totalPages = bookData
      ? Math.ceil(bookData.length / (isSinglePageView ? 1 : 2))
      : 0;

   const containerRef = useRef(null);

   const pageIndex = currentPage * (isSinglePageView ? 1 : 2);

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
      setPageHistory([...pageHistory, currentPage]);
      setCurrentPage(newPage);
      stopReading();
   };

   const goToPreviousPage = () => {
      if (pageHistory.length > 0) {
         const lastPage = pageHistory.pop();
         setCurrentPage(lastPage);
         setPageHistory(pageHistory);
      }
   };

   const startReading = () => {
      setIsReading(true);
      const pageText = containerRef.current
         ? extractAndLogText(containerRef.current.innerHTML)
         : [];

      pageText.forEach((line) => {
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

   const handleScreenshot = () => {
      takeScreenshot(".book-container", "book-screenshot");
   };

   return (
      <div className="relative h-screen grid grid-rows-12 book-container">
         {/* Main content area */}
         <div className="row-span-10 overflow-hidden">
            <div className="h-full flex items-start justify-center">
               <div
                  className="flex-1 pb-4 flex justify-center"
                  style={{
                     minWidth: isSinglePageView ? "764px" : "1400px",
                     transform: `scaleX(${scale}) scaleY(${scaleY})`,
                  }}
               >
                  {bookData && pageIndex < bookData.length && (
                     <div
                        className={`bg-white p-4 shadow-md rounded-lg overflow-auto ${
                           isSinglePageView
                              ? "w-full h-[790px]"
                              : "w-[600px] h-[790px]"
                        }`}
                        ref={containerRef}
                        dangerouslySetInnerHTML={{
                           __html: bookData[pageIndex].content,
                        }}
                     />
                  )}
                  {!isSinglePageView &&
                     bookData &&
                     pageIndex + 1 < bookData.length && (
                        <div
                           className="bg-white p-4 shadow-md rounded-lg w-[595px] h-[790px] overflow-auto"
                           dangerouslySetInnerHTML={{
                              __html: bookData[pageIndex + 1].content,
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
               <Controls
                  toggleReading={toggleReading}
                  isReading={isReading}
                  goToPreviousPage={goToPreviousPage}
                  handleScreenshot={handleScreenshot} // Pass the screenshot handler
               />
            </div>
         </div>
      </div>
   );
};

export default Book;
