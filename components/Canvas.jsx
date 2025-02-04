import { bottomNaviConfig } from "@/data/Stage";
import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ isSelected, isZoomMode, strokeColor = "vanilla", onSave, className }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const chocoPenColors = bottomNaviConfig[5][0].data;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 64;
    canvas.height = 56;
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    contextRef.current = ctx;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = chocoPenColors[strokeColor]?.fill || "#fff";
    }
  }, [strokeColor]);

  const getCoordinates = (e) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width; // 스케일 비율
    const scaleY = canvasRef.current.height / rect.height;

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL();
      if (onSave) {
        onSave(imageData); 
      } else {
        console.error("❌ onSave 함수가 정의되지 않음!"); 
      }
    }
  };
  

  return (
    <canvas
      ref={canvasRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${className} ${
        isSelected && isZoomMode ? "scale-[2] transition duration-200 ease-in-out" : ""
      }`}
      width={64}
      height={56}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default Canvas;
