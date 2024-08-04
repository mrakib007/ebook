import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const NotesControl = ({
   toggleDrawingMode,
   undo,
   enableDrawing,
   disableDrawing,
   handleColorChange,
   color,
}) => {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-14 left-0 flex flex-col space-y-2 bg-gray-600 p-2 rounded-md mb-2"
            style={{ transform: "translateY(-100%)" }} // Keep the same translateY
         >
            <input type="color" value={color} onChange={handleColorChange} />
            <button
               onClick={enableDrawing}
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
            >
               <Icon icon="bxs:paint" width={24} />
            </button>

            <button
               onClick={disableDrawing}
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
            >
               <Icon icon="mdi:brush-off" width={24} />
            </button>
            <button
               onClick={undo}
               className="cursor-pointer p-2 rounded-md bg-zinc-900 text-white flex items-center justify-center"
            >
               <Icon icon="fluent-mdl2:erase-tool" width={24} />
            </button>
         </motion.div>
      </AnimatePresence>
   );
};

export default NotesControl;
