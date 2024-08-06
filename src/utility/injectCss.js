// utils/injectCSS.js
export const injectCSS = (bookData) => {
    const styleElement = document.createElement("style");
    const cssContent = bookData?.map((page) => page.csscontent).join(" ");
    const inlineCSS = bookData
      ?.map((page) => {
        const matches = page.inlinecss.match(/<style>(.*?)<\/style>/);
        return matches ? matches[1] : '';
      })
      .join(" ");
    styleElement.innerHTML = `${cssContent} ${inlineCSS}`;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  };
  