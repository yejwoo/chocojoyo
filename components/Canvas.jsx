import React, { useRef, useEffect, useState } from "react";
import { bottomNaviData } from "@/data/Stage";

const ChocolateCanvas = ({ isSelected, strokeColor = "vanilla", onSave }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const chocoPenColors = bottomNaviData.stage5[0].data;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 64;
    canvas.height = 56;
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;

    contextRef.current = ctx;
  }, []);

  // 초코펜 색상 변경
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle =
        chocoPenColors[strokeColor]?.fill || "#fff";
    }
  }, [strokeColor]);

  const startDrawing = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = getTouchPos(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getTouchPos(e);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();

    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL();
      onSave(imageData);
    }
  };

  const getTouchPos = (e) => {
    if (e.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    }
    return e.nativeEvent;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-none"
      width={64}
      height={56}
      //   style={{
      //     display: isSelected ? "block" : "none", // 선택된 초콜릿에서만 캔버스 표시
      //   }}
    />
  );
};

export default ChocolateCanvas;
