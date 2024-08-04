import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const ZoomControls = ({
   isZoomControlsVisible,
   handleZoomIn,
   handleZoomOut,
   handleReload,
}) => (
   <AnimatePresence>
      {isZoomControlsVisible && (
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-14 left-0 right-0 flex flex-col space-y-2 bg-gray-600 p-2 rounded-md mb-2"
            style={{ transform: "translateY(-100%)" }} // Keep the same translateY
         >
            <button
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
               onClick={handleReload}
            >
               <Icon icon="mdi:reload" width={24} />
            </button>
            <button
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
               onClick={handleZoomOut}
            >
               <Icon icon="mdi:minus" width={24} />
            </button>
            <button
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
               onClick={handleZoomIn}
            >
               <Icon icon="mdi:plus" width={24} />
            </button>
         </motion.div>
      )}
   </AnimatePresence>
);

export default ZoomControls;
