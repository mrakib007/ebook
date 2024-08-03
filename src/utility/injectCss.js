// utils/injectCSS.js
export const injectCSS = (bookData) => {
    // Create a style element
    const styleElement = document.createElement("style");

    // Combine regular CSS content and inline CSS content
    const cssContent = bookData?.map((page) => page.csscontent).join(" ");
    const inlineCSS = bookData?.map((page) => page.inlinecss).join(" ");
    styleElement.innerHTML = `${cssContent} ${inlineCSS}`;

    // Append the style element to the document's head
    document.head.appendChild(styleElement);

    // Return a cleanup function to remove the style element
    return () => {
        document.head.removeChild(styleElement);
    };
};
