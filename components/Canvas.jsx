import React, { useRef, useEffect, useState } from "react";
import { chocopenColors } from "@/utils/constants";

const Canvas = ({ isToppingMode, strokeColor = "vanilla", onSave, uiState, className, setUIState, showDrawing, drawingData, mode = 'stage' }) => {
  // console.log(mode);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  if (contextRef.current && uiState.isClearCanvas) {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  useEffect(() => {
    if (!uiState.isResetPopupOpen) {
      setUIState((prev) => ({ ...prev, isClearCanvas: false }));
    }
  }, [uiState.isResetPopupOpen]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = 64;
    canvas.height = 56;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    contextRef.current = ctx;

    // console.log(ctx)
  }, []);

  // 저장된 그린 그림 불러오기
  useEffect(() => {
    // canvasRef.current가 존재할 때만 실행
    if (showDrawing && drawingData && contextRef.current && canvasRef.current) {
      const img = new Image();
      img.crossOrigin = "anonymous";  
      img.src = drawingData;
      img.onload = () => {
        // canvasRef.current가 여전히 존재하는지 재확인
        if (canvasRef.current && contextRef.current) {
          contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          contextRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      };
    }
  }, [showDrawing, drawingData, contextRef]);
  

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = chocopenColors[strokeColor]?.[100] || "#fff";
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
    if (isToppingMode || mode !== 'stage') return;
    // e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing ||  mode !== 'stage') return;
    // e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const isCanvasEmpty = () => {
    if (!canvasRef.current || !contextRef.current) return true;

    const ctx = contextRef.current;
    const { width, height } = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    return !imageData.some((pixel) => pixel !== 0);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();

    if (canvasRef.current && !isCanvasEmpty()) {
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
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
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
