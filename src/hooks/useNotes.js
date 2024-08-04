import { useState, useRef, useCallback, useEffect } from 'react';

const useNotes = () => {
    const [isNoteControlsVisible, setIsNoteControlsVisible] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lines, setLines] = useState([]);
    const canvasRef = useRef(null);
    const [strokes, setStrokes] = useState([]);
    const [currentStroke, setCurrentStroke] = useState([]);
    const [canDraw, setCanDraw] = useState(false);
    const [color, setColor] = useState('#000000'); // Default color is black

    const startDrawing = (e) => {
        if (!canDraw) return;
        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true);
        setCurrentStroke([{ x: offsetX, y: offsetY, color }]);
    };

    const draw = (e) => {
        if (!isDrawing || !canDraw) return;
        const { offsetX, offsetY } = e.nativeEvent;
        setCurrentStroke((prevStroke) => [...prevStroke, { x: offsetX, y: offsetY, color }]);
    };

    const endDrawing = () => {
        if (!canDraw) return;
        if (currentStroke.length > 0) {
            setStrokes((prevStrokes) => [...prevStrokes, currentStroke]);
            setCurrentStroke([]);
        }
        setIsDrawing(false);
    };

    const enableDrawing = () => setCanDraw(true);
    const disableDrawing = () => setCanDraw(false);

    const undo = () => {
        setStrokes((prevStrokes) => prevStrokes.slice(0, -1));
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) { // Check if canvas is not null
            const context = canvas.getContext('2d');
            if (context) { // Check if context is not null
                context.clearRect(0, 0, canvas.width, canvas.height);

                strokes.forEach((stroke) => {
                    context.beginPath();
                    stroke.forEach(({ x, y, color }, index) => {
                        context.strokeStyle = color;
                        if (index === 0) {
                            context.moveTo(x, y);
                        } else {
                            context.lineTo(x, y);
                        }
                    });
                    context.stroke();
                });

                if (currentStroke.length > 0) {
                    context.beginPath();
                    currentStroke.forEach(({ x, y, color }, index) => {
                        context.strokeStyle = color;
                        if (index === 0) {
                            context.moveTo(x, y);
                        } else {
                            context.lineTo(x, y);
                        }
                    });
                    context.stroke();
                }
            }
        }
    }, [strokes, currentStroke]);

    return {
        isNoteControlsVisible,
        setIsNoteControlsVisible,
        isDrawing,
        setIsDrawing,
        canvasRef,
        startDrawing,
        draw,
        endDrawing,
        undo,
        enableDrawing,
        disableDrawing,
        handleColorChange,
        color
    };
};

export default useNotes;
