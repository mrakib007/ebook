import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

const Controls = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
        <Button icon="ion:camera-sharp" text="Screenshot" isMobile={isMobile} />
        <Button icon="solar:notes-bold" text="Notes" isMobile={isMobile} />
        <Button icon="material-symbols-light:folder" text="Gallery" isMobile={isMobile} />
        <Button icon="material-symbols-light:home-outline" text="Home" isMobile={isMobile} />
        <Button icon="ooui:arrow-previous-ltr" text="Previous" isMobile={isMobile} />
        <Button icon="mdi:volume-high" text="Listen" isMobile={isMobile} />
        <Button icon="ph:file-pdf" text="PDF" isMobile={isMobile} />
        <Button icon="mdi:reload" text="Reload" isMobile={isMobile} />
        <Button icon="mdi:fullscreen" text="Fullscreen" isMobile={isMobile} />
      </div>
    </div>
  );
};

export default Controls;
