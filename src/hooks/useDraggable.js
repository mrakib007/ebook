import { useState, useEffect } from "react";

const useDraggable = (zoomCount, containerRef) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (zoomCount > 0 && containerRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = containerRef.current.scrollHeight;

        // Calculate new offset
        let newY = e.clientY - dragStart.y;

        // Boundary conditions: 200px from the top and 200px from the bottom
        const maxScrollUp = 200; // Allowable scroll up from the initial position
        const maxScrollDown = contentHeight - containerHeight + 200; // Allowable scroll down

        // Ensure newY is within boundaries
        newY = Math.max(-maxScrollDown, newY); // Prevent dragging up beyond limit
        newY = Math.min(maxScrollUp, newY); // Prevent dragging down beyond limit

        setDragOffset((prevOffset) => ({
          ...prevOffset,
          y: newY,
        }));
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { isDragging, dragOffset, handleMouseDown };
};

export default useDraggable;
