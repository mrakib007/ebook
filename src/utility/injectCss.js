// utils/injectCSS.js
export const injectCSS = (bookData) => {
  const styleElement = document.createElement("style");
  // Extract only the csscontent from the bookData
  const cssContent = bookData?.map((page) => page.csscontent).join(" ");
  // Set the content of the style element to the extracted CSS content
  styleElement.innerHTML = `${cssContent}`;
  // Append the style element to the document head
  document.head.appendChild(styleElement);
  // Return a cleanup function to remove the style element when necessary
  return () => {
    document.head.removeChild(styleElement);
  };
};
