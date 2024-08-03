// screenshotUtil.js
import html2canvas from "html2canvas";

export const takeScreenshot = (elementSelector, fileName) => {
   const element = document.querySelector(elementSelector);
   if (element) {
      html2canvas(element, {
         scale: 2,
         backgroundColor: "#ffffff",
         useCORS: true,
         scrollX: 0,
         scrollY: 0,
      }).then((canvas) => {
         const link = document.createElement("a");
         link.href = canvas.toDataURL("image/png");
         link.download = `${fileName}.png`;
         link.click();
      });
   }
};

export const toggleFullscreen = () => {
    const bookElement = document.documentElement;
    if (!document.fullscreenElement) {
       bookElement.requestFullscreen().catch((err) => {
          console.error(
             `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          );
       });
    } else {
       document.exitFullscreen();
    }
 };
