import { bottomNaviConfig } from "@/data/Stage";
import { MAX_HISTORY_LENGTH, chocopenColors } from "@/utils/constants";
import React, { useRef, useEffect, useState } from "react";

const Canvas = ({
  isToppingMode,
  isSelected,
  isZoomMode,
  strokeColor = "vanilla",
  onSave,
  uiState,
  gameState,
  selectionState,
  chocolateInfo,
  className,
  setUIState,
  setGameState,
  setChocolateInfo,
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const debounceTimer = useRef(null);

  if (contextRef.current && uiState.isClearCanvas) {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  useEffect(() => {
    if (!uiState.isResetPopupOpen) {
      setUIState((prev) => ({ ...prev, isClearCanvas: false }));
    }
  }, [uiState.isResetPopupOpen]);

  // 캔바스 초기화
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
  }, []);

  // 초코펜 컬러 변경
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = chocopenColors[strokeColor]?.[100] || "#fff";
    }
  }, [strokeColor]);

  // 뒤로가기, 앞으로가기
  useEffect(() => {
    if (contextRef.current && uiState.isBackBtnClicked) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const currentIndex = selectionState.currentChocolateIndex;
      const strokes = chocolateInfo.strokes[currentIndex] || [];

      strokes.forEach((stroke) => {
        contextRef.current.beginPath();
        stroke.forEach((point, index) => {
          if (index === 0) {
            contextRef.current.moveTo(point.x, point.y);
          } else {
            contextRef.current.lineTo(point.x, point.y);
          }
        });
        contextRef.current.stroke();
      });

      setUIState((prev) => ({ ...prev, isBackBtnClicked: false }));
    }
  }, [uiState.isBackBtnClicked, JSON.stringify(chocolateInfo.strokes[selectionState.currentChocolateIndex]), selectionState.currentChocolateIndex]);

  // 캔바스 그림 위치 조정
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
    if (isToppingMode) return;

    e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setUIState((prev) => ({...prev, isDrawing: true}))

    // 새로운 획 시작 시 데이터 초기화
    setChocolateInfo((prev) => ({
      ...prev,
      strokes: {
        ...prev.strokes,
        [selectionState.currentChocolateIndex]: [...(prev.strokes[selectionState.currentChocolateIndex] || []), [{ x, y }]],
      },
    }));
  };

  const draw = (e) => {
    if (!uiState.isDrawing) return;
    e.preventDefault();

    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    // 디바운싱 적용: 일정 시간 동안 이벤트가 발생하지 않을 때만 상태 업데이트
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setChocolateInfo((prev) => {
        const currentStrokes = prev.strokes[selectionState.currentChocolateIndex] || [];
        currentStrokes[currentStrokes.length - 1].push({ x, y });
        return {
          ...prev,
          strokes: {
            ...prev.strokes,
            [selectionState.currentChocolateIndex]: currentStrokes,
          },
        };
      });
    }, 100); // 100ms 동안 추가 이벤트가 없으면 저장
  };

  const isCanvasEmpty = () => {
    if (!canvasRef.current || !contextRef.current) return true;

    const ctx = contextRef.current;
    const { width, height } = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    return !imageData.some((pixel) => pixel !== 0);
  };

  const stopDrawing = () => {
    setUIState((prev) => ({...prev, isDrawing: false}))
    contextRef.current.closePath();

    let imageData;

    if (canvasRef.current && !isCanvasEmpty()) {
      imageData = canvasRef.current.toDataURL();
      if (onSave) {
        onSave(imageData);
      } else {
        console.error("❌ onSave 함수가 정의되지 않음!");
      }
    }

    // 뒤로가기, 앞으로가기를 위해 그림 히스토리 저장
    if (imageData) {
      const currentIndex = selectionState.currentChocolateIndex;
      const newDrawings = { ...chocolateInfo.drawings, [currentIndex]: imageData };
      let newHistory = [...gameState.history.slice(0, gameState.historyIndex + 1), { drawings: newDrawings }];

      // 히스토리 최대 길이 초과 시 오래된 항목 삭제
      if (newHistory.length > MAX_HISTORY_LENGTH) {
        newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH);
      }

      setGameState((prev) => ({
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }));
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className} ${
        isSelected && isZoomMode && !uiState.isResetPopupOpen ? "scale-[2.2] transition duration-200 ease-in-out z-30" : "z-20"
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
