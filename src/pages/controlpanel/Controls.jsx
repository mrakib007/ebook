import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { toggleFullscreen } from "../../utility/screenshotUtil";
import Modal from "../../components/Modal";
import ZoomControls from "../ZoomControls/ZoomControls";
import Accessibility from "../../components/Accessibility";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import NotesControl from "../NotesControl/NotesControl";

const Controls = ({
   toggleReading,
   isReading,
   goToPreviousPage,
   handleScreenshot,
   handleZoomIn,
   handleZoomOut,
   handleReload,
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
   isCanvas,
   setIsCanvas,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [isOpen, setIsOpen] = useState(false);
   const [isZoomControlsVisible, setIsZoomControlVisible] = useState(false);
   const [isNoteControlsVisible, setIsNoteControlVisible] = useState(false);

   const ZoomControlsRef = useRef(null);
   const notesControlsRef = useRef(null);

   useOnClickOutside(ZoomControlsRef, () => setIsZoomControlVisible(false));
   useOnClickOutside(notesControlsRef, () => setIsNoteControlVisible(false));

   const handleZoomControls = () => {
      setIsZoomControlVisible(!isZoomControlsVisible);
   };
   const handleNotesControls = () => {
      setIsNoteControlVisible(!isNoteControlsVisible);
      setIsCanvas(!isCanvas);
   };

   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return (
      <div className="bg-[#FFDFCD] p-1">
         <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <Accessibility isMobile={isMobile} />
            <Button
               icon="ion:camera-sharp"
               text="Screenshot"
               onClick={handleScreenshot}
               isMobile={isMobile}
            />
            <div className="relative" ref={notesControlsRef}>
               {isNoteControlsVisible && (
                  <NotesControl
                     toggleDrawingMode={setIsDrawing}
                     enableDrawing={enableDrawing}
                     disableDrawing={disableDrawing}
                     undo={undo}
                     handleColorChange={handleColorChange}
                     color={color}
                  />
               )}
               <Button
                  onClick={handleNotesControls}
                  icon="solar:notes-bold"
                  text="Notes"
                  isMobile={isMobile}
               />
            </div>
            <Button
               icon="material-symbols-light:folder"
               text="Gallery"
               isMobile={isMobile}
               onClick={openModal}
            />
            <Button
               icon="material-symbols-light:home-outline"
               text="Home"
               isMobile={isMobile}
            />
            <Button
               icon="ooui:arrow-previous-ltr"
               text="Previous"
               onClick={goToPreviousPage}
               isMobile={isMobile}
            />
            <Button
               icon={
                  isReading
                     ? "material-symbols-light:volume-off"
                     : "mdi:volume-high"
               }
               onClick={toggleReading}
               text={isReading ? "Stop" : "Listen"}
               isMobile={isMobile}
            />
            <Button icon="ph:file-pdf" text="PDF" isMobile={isMobile} />
            <Button
               icon="mdi:reload"
               text="Reload"
               isMobile={isMobile}
               onClick={() => window.location.reload()}
            />
            <div className="relative" ref={ZoomControlsRef}>
               {isZoomControlsVisible && (
                  <ZoomControls
                     handleZoomIn={handleZoomIn}
                     handleZoomOut={handleZoomOut}
                     handleReload={handleReload}
                     isZoomControlsVisible={isZoomControlsVisible}
                  />
               )}
               <Button
                  icon="ic:round-zoom-in"
                  text="Zoom In"
                  isMobile={isMobile}
                  onClick={() => handleZoomControls()}
               />
            </div>
            <Button
               icon="mdi:fullscreen"
               text="Fullscreen"
               isMobile={isMobile}
               onClick={toggleFullscreen}
            />
         </div>
         <Modal isOpen={isOpen} onClose={closeModal} />
      </div>
   );
};

export default Controls;
