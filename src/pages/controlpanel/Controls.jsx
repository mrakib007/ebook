import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { toggleFullscreen } from "../../utility/screenshotUtil";
import mediaArray from "../../utility/media";
// import GalleryModal from "../../components/GalleryModal"

const Controls = ({
   toggleReading,
   isReading,
   goToPreviousPage,
   handleScreenshot,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [isOpen, setIsOpen] = useState(false);

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
            <Button
               icon="ion:camera-sharp"
               text="Screenshot"
               onClick={handleScreenshot}
               isMobile={isMobile}
            />
            <Button icon="solar:notes-bold" text="Notes" isMobile={isMobile} />
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
            <Button
               icon="mdi:fullscreen"
               text="Fullscreen"
               isMobile={isMobile}
               onClick={toggleFullscreen}
            />
         </div>
         {/* <GalleryModal
            mediaArray={mediaArray}
            isOpen={isOpen}
            onClose={closeModal}
         /> */}
         
      </div>
   );
};

export default Controls;
