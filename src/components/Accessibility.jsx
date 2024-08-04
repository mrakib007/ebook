import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import cursor from "./cursor.svg";
import { motion, AnimatePresence } from "framer-motion";

const Accessibility = ({isMobile}) => {
   const [isDivVisible, setDivVisibility] = useState(false);
   const [activeFeatures, setActiveFeatures] = useState({});
   const [fontSize, setFontSize] = useState(16);
   const selectedButton = localStorage.getItem("selectedButton");

   const toggleFeature = (featureKey, actionOn, actionOff) => {
      setActiveFeatures((prevActiveFeatures) => {
         const isActive = prevActiveFeatures[featureKey];
         if (isActive) {
            actionOff();
         } else {
            actionOn();
         }
         return {
            ...prevActiveFeatures,
            [featureKey]: !isActive,
         };
      });
   };

   const invertColor = () => {
      document.documentElement.style.filter = "invert(100%)";
   };
   const revertInvertColor = () => {
      document.documentElement.style.filter = "";
   };
   const monochrome = () => {
      document.documentElement.style.filter = "grayscale(100%)";
   };
   const revertMonochrome = () => {
      document.documentElement.style.filter = "";
   };
   const highlightLinks = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
         link.style.color = "tomato";
         link.style.backgroundColor = "#cde400";
      });
   };
   const revertHighlightLinks = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
         link.style.color = "";
         link.style.backgroundColor = "";
      });
   };
   const showHeadings = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
         heading.style.backgroundColor = "#cde400";
      });
   };
   const revertShowHeadings = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
         heading.style.backgroundColor = "";
      });
   };
   const bigCursor = () => {
      document.documentElement.style.cursor = `url(${cursor}), auto`;
   };
   const revertBigCursor = () => {
      document.documentElement.style.cursor = "auto";
   };
   const changeFontSize = (size) => {
      const elements = document.querySelectorAll("*");
      elements.forEach((element) => {
         element.style.fontSize = `${size}px`;
      });
      setFontSize(size);
   };
   const increaseText = () => changeFontSize(fontSize + 1);
   const decreaseText = () => changeFontSize(fontSize - 1);
   const normalText = () => changeFontSize(16);

   const resetChanges = () => {
      document.documentElement.style.filter = "";
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
         link.style.color = "";
         link.style.backgroundColor = "inherit";
      });
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
         heading.style.backgroundColor = "";
      });
      document.documentElement.style.cursor = "auto";
      const elements = document.querySelectorAll("*");
      elements.forEach((element) => {
         element.style.fontSize = `16px`;
      });
      setActiveFeatures({});
      setFontSize(16);
   };

   const buttons = [
      {
         key: "increaseText",
         text: "Increase Text",
         icon: "material-symbols:text-increase",
         actionOn: increaseText,
         actionOff: normalText,
      },
      {
         key: "normalText",
         text: "Format Text",
         icon: "material-symbols:text-format",
         actionOn: normalText,
         actionOff: normalText,
      },
      {
         key: "decreaseText",
         text: "Decrease Text",
         icon: "material-symbols:text-decrease",
         actionOn: decreaseText,
         actionOff: normalText,
      },
      {
         key: "monochrome",
         text: "Monochrome",
         icon: "material-symbols:accessibility",
         actionOn: monochrome,
         actionOff: revertMonochrome,
      },
      {
         key: "bigCursor",
         text: "Big Cursor",
         icon: "ph:cursor",
         actionOn: bigCursor,
         actionOff: revertBigCursor,
      },
      {
         key: "invertColor",
         text: "Invert Color",
         icon: "mdi:invert-colors",
         actionOn: invertColor,
         actionOff: revertInvertColor,
      },
      {
         key: "highlightLink",
         text: "Highlight Links",
         icon: "mdi:insert-link",
         actionOn: highlightLinks,
         actionOff: revertHighlightLinks,
      },
      {
         key: "showHeadings",
         text: "Show Headings",
         icon: "bx:heading",
         actionOn: showHeadings,
         actionOff: revertShowHeadings,
      },
      {
         key: "reset",
         text: "Reset",
         icon: "mdi:restore",
         actionOn: resetChanges,
         actionOff: resetChanges,
      },
   ];

   const handleButtonClick = () => {
      setDivVisibility(!isDivVisible);
   };

   const handleClickAway = (event) => {
      if (
         isDivVisible &&
         containerRef.current &&
         !containerRef.current.contains(event.target)
      ) {
         setDivVisibility(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickAway);

      return () => {
         document.removeEventListener("click", handleClickAway);
      };
   }, [isDivVisible]);

   const containerRef = useRef(null);

   useEffect(() => {
      if (selectedButton) {
         const selectedAction = buttons.find(
            (button) => button.key === selectedButton
         );
         if (selectedAction) {
            selectedAction.actionOn();
            setActiveFeatures((prevActiveFeatures) => ({
               ...prevActiveFeatures,
               [selectedButton]: true,
            }));
         }
      }
   }, [selectedButton]);

   return (
      <div ref={containerRef} className="relative ml-2">
         <button
            onClick={handleButtonClick}
            className={`bg-[#FF9248] flex flex-col items-center justify-center rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${isMobile ? "h-[40px] w-[60px]" : "h-[55px] w-[95px]"}`}
         >
            <div className="flex flex-col items-center justify-center p-1">
               <Icon icon="material-symbols-light:accessibility" width={25} />
               <p className="text-sm">{isMobile ? "" : "Accessibility"}</p>
            </div>
         </button>

         <AnimatePresence>
            {isDivVisible && (
               <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-14 left-0 flex flex-col space-y-2 bg-gray-600 p-2 rounded-md mb-2"
               >
                  {buttons.map((button) => (
                     <button
                        key={button.key}
                        className={`p-2 rounded-md ${
                           activeFeatures[button.key]
                              ? "bg-zinc-700 text-white"
                              : "bg-zinc-900 text-white"
                        }`}
                        onClick={() => {
                           localStorage.setItem("selectedButton", button.key);
                           toggleFeature(
                              button.key,
                              button.actionOn,
                              button.actionOff
                           );
                        }}
                     >
                        <Icon icon={button.icon} className="h-6 w-6" />
                     </button>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Accessibility;
