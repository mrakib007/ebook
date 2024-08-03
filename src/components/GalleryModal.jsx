import { useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog } from "@headlessui/react";
import Draggable from "react-draggable";

const GalleryModal = ({ isOpen, onClose, mediaArray }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isMinimized, setIsMinimized] = useState(false);
   console.log(mediaArray);

   const handleNext = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex < mediaArray.length - 1 ? prevIndex + 1 : 0
      );
   };

   const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex > 0 ? prevIndex - 1 : mediaArray.length - 1
      );
   };

   const handleJumpTo = (index) => {
      setCurrentIndex(index);
   };

   return (
      <Dialog
         open={isOpen}
         onClose={onClose}
         className="fixed inset-0 z-50 flex items-center justify-center"
      >
         <Dialog.Overlay className="fixed inset-0 bg-black/30" />

         <Draggable disabled={!isMinimized}>
            <div
               className={`relative bg-white rounded-lg shadow-lg transition-all p-6 ${
                  isMinimized
                     ? "w-[1100px] h-auto mx-auto cursor-move"
                     : "w-[90vw] h-[90vh] mx-auto"
               }`}
            >
               {/* Header */}
               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <Dialog.Title className="text-xl font-semibold">
                     Gallery
                  </Dialog.Title>
                  <div className="flex space-x-2">
                     {isMinimized ? (
                        <button
                           type="button"
                           className="text-gray-500 hover:text-gray-700"
                           onClick={() => setIsMinimized(false)}
                        >
                           <Icon
                              icon="mdi:fullscreen"
                              className="w-6 h-6 transition-transform rotate-180"
                              aria-hidden="true"
                           />
                        </button>
                     ) : (
                        <button
                           type="button"
                           className="text-gray-500 hover:text-gray-700"
                           onClick={() => setIsMinimized(true)}
                        >
                           <Icon
                              icon="mdi:minimize"
                              className="w-6 h-6 transition-transform"
                              aria-hidden="true"
                           />
                        </button>
                     )}
                     <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                     >
                        <Icon
                           icon="mdi:close"
                           className="w-6 h-6"
                           aria-hidden="true"
                        />
                     </button>
                  </div>
               </div>

               {/* Slider Content */}
               <div className="relative h-full flex flex-col">
                  {/* Media Display */}
                  <div className="flex justify-center items-start mt-3 h-full flex-1">
                     {mediaArray[currentIndex].type === "image" ? (
                        <img
                           src={mediaArray[currentIndex].src}
                           alt={mediaArray[currentIndex].alt}
                           className="w-[80vw] h-[70vh] object-cover mb-3"
                        />
                     ) : (
                        <iframe
                           width="100%"
                           height="100%"
                           src={mediaArray[currentIndex].src.replace(
                              "watch?v=",
                              "embed/"
                           )}
                           title={mediaArray[currentIndex].alt}
                           frameBorder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           className="w-[80vw] max-w-[800px] h-[70vh] max-h-[600px] mb-3"
                        ></iframe>
                     )}
                  </div>

                  {/* Pagination Dots */}
                  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                     {mediaArray.map((_, index) => (
                        <button
                           key={index}
                           onClick={() => handleJumpTo(index)}
                           className={`w-3 h-3 rounded-full ${
                              currentIndex === index
                                 ? "bg-blue-500"
                                 : "bg-gray-500"
                           }`}
                        />
                     ))}
                  </div>

                  {/* Navigation Buttons */}
                  <button
                     onClick={handlePrev}
                     className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
                  >
                     <Icon icon="heroicons-outline:chevron-left" />
                  </button>
                  <button
                     onClick={handleNext}
                     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
                  >
                     <Icon icon="heroicons-outline:chevron-right" />
                  </button>
               </div>
            </div>
         </Draggable>
      </Dialog>
   );
};

export default GalleryModal;
