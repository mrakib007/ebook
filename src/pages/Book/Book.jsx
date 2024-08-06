import { useState, useRef, useEffect } from "react";
import useDataFetching from "../../hooks/useDataFetching";
import Controls from "../controlpanel/Controls";
import Pagination from "../../components/Pagination";
import useResize from "../../hooks/useResize";
import { takeScreenshot, toggleFullscreen } from "../../utility/screenshotUtil";
import { injectCSS } from "../../utility/injectCss";
import useNotes from "../../hooks/useNotes";
import useDraggable from "../../hooks/useDraggable"; // Import the hook
import PageNavigation from "../../components/PageNavigation";

const Book = () => {
   const { data: book } = useDataFetching({
      queryKey: "books",
      endPoint: "/mastering-clean-code-a-comprehensive-guide",
   });

   const {
      isSinglePageView,
      scale,
      scaleY,
      handleZoomIn,
      handleZoomOut,
      handleReload,
      zoomCount,
   } = useResize();

   const {
      isNoteControlsVisible,
      setIsNoteControlsVisible,
      isDrawing,
      setIsDrawing,
      canvasRef,
      startDrawing,
      draw,
      endDrawing,
      toggleDrawingMode,
      undo,
      enableDrawing,
      disableDrawing,
      handleColorChange,
      color,
   } = useNotes();

   const bookData = book?.ebookPages?.data.map((page) => ({
      id: page?.id,
      content: page?.htmlcontent,
      csscontent: page?.csscontent,
      inlinecss: page?.inlinehtmlcss,
   }));

   console.log(bookData);

   useEffect(() => {
      const cleanup = injectCSS(bookData);

      return () => {
         if (cleanup) cleanup();
      };
   }, [bookData]);

   const [currentPage, setCurrentPage] = useState(0);
   const [isReading, setIsReading] = useState(false);
   const [pageHistory, setPageHistory] = useState([]);
   const [isCanvas, setIsCanvas] = useState(false);
   const [isFullscreen, setIsFullscreen] = useState(false);

   // Use the draggable hook
   const containerRef = useRef(null);
   const { isDragging, dragOffset, handleMouseDown } = useDraggable(zoomCount, containerRef);

   const totalPages = bookData
      ? Math.ceil(bookData.length / (isSinglePageView ? 1 : 2))
      : 0;

   const leftPageRef = useRef(null);
   const rightPageRef = useRef(null);

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

      const leftPageText = leftPageRef.current
         ? extractAndLogText(leftPageRef.current.innerHTML)
         : [];
      const rightPageText = rightPageRef.current
         ? extractAndLogText(rightPageRef.current.innerHTML)
         : [];
      const combinedText = [...leftPageText, ...rightPageText];

      combinedText.forEach((line) => {
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

   const handleToggleFullscreen = () => {
      toggleFullscreen();
      setIsFullscreen((prev) => !prev);
   };

   useEffect(() => {
      const onFullscreenChange = () => {
         setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", onFullscreenChange);
      return () => {
         document.removeEventListener("fullscreenchange", onFullscreenChange);
      };
   }, []);

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
      <div ref={containerRef} className="relative h-screen grid grid-rows-12 book-container">
         <div className="row-span-10 overflow-hidden">
            <div
               className="h-full flex items-start justify-center"
               style={
                  zoomCount !== 0
                     ? {
                          transform: `scale(${scale})`,
                          transformOrigin: "center center",
                          cursor: isDragging ? "grabbing" : "grab",
                          position: "relative",
                          left: `${dragOffset.x}px`,
                          top: `${dragOffset.y}px`,
                       }
                     : {}
               }
               onMouseDown={handleMouseDown}
            >
               <div
                  className="flex-1 pb-4 flex justify-center"
                  style={{
                     minWidth: isSinglePageView ? "764px" : "1400px",
                     transform: `scaleX(${scale}) scaleY(${scaleY})`,
                  }}
               >
                  {/* {isCanvas ? ( */}
                  {/* <canvas
                        ref={canvasRef}
                        className="absolute inset-0 z-10 w-[100%] h-[100%]"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                     /> */}
                  {/* ) : null} */}
                  {bookData && pageIndex < bookData.length && (
                     <div
                        className={`bg-white p-4 shadow-md rounded-lg overflow-auto ${
                           isSinglePageView ? "w-full" : "w-[600px]"
                        }`}
                        style={{
                           height: isFullscreen ? "850px" : "790px",
                        }}
                        ref={leftPageRef}
                        dangerouslySetInnerHTML={{
                           __html: bookData[pageIndex].content,
                        }}
                     />
                  )}
                  {!isSinglePageView &&
                     bookData &&
                     pageIndex + 1 < bookData.length && (
                        <div
                           className="bg-white p-4 shadow-md rounded-lg w-[600px] overflow-auto"
                           style={{
                              height: isFullscreen ? "850px" : "790px",
                           }}
                           ref={rightPageRef}
                           dangerouslySetInnerHTML={{
                              __html: bookData[pageIndex + 1].content,
                           }}
                        />
                     )}
               </div>
            </div>
         </div>

         <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            <div className="w-full">
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
               />
            </div>
            <div className="w-full bg-[#FFDFCD]">
               <Controls
                  toggleReading={toggleReading}
                  isReading={isReading}
                  goToPreviousPage={goToPreviousPage}
                  isSinglePageView={isSinglePageView}
                  toggleFullscreen={handleToggleFullscreen}
                  isFullscreen={isFullscreen}
                  handleScreenshot={handleScreenshot}
                  scale={scale}
                  zoomCount={zoomCount}
                  handleZoomIn={handleZoomIn}
                  handleZoomOut={handleZoomOut}
                  handleReload={handleReload}
                  handleToggleFullscreen={handleToggleFullscreen}
                  isNoteControlsVisible={isNoteControlsVisible}
                  setIsNoteControlsVisible={setIsNoteControlsVisible}
                  toggleDrawingMode={toggleDrawingMode}
                  isDrawing={isDrawing}
                  undo={undo}
                  enableDrawing={enableDrawing}
                  disableDrawing={disableDrawing}
                  handleColorChange={handleColorChange}
                  color={color}
               />
            </div>
         </div>
         <PageNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
         />
      </div>
   );
};

export default Book;
