import { useState, useEffect } from "react";

const useResize = () => {
  const [isSinglePageView, setIsSinglePageView] = useState(window.innerWidth < 768);
  const [scale, setScale] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsSinglePageView(w < 768);

      if (w < 768) {
        setScale(w / 768);
        setScaleY(Math.min(1, w / 768));
      } else if (w < 1300) {
        setScale(w / 1300);
        setScaleY(Math.min(1, w / 1170));
      } else {
        setScale(1);
        setScaleY(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSinglePageView, scale, scaleY };
};

export default useResize;
