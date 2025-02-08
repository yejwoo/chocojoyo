export const handleSaveDrawing = (imageData, setChocolateInfo, currentChocolateIndex) => {
  setChocolateInfo((prev) => ({
    ...prev,
    drawings: {
      ...prev.drawings,
      [currentChocolateIndex]: imageData,
    },
  }));
};

export const handleZoomMode = (setUIState) => {
  setUIState((prev) => ({
    ...prev,
    isZoomMode: !prev.isZoomMode,
  }));
};

export const handleMouseOver = (setSelectionState, index) => {
  setSelectionState((prev) => ({ ...prev, currentChocolateIndex: index }));
};

export const handleMouseLeave = (setSelectionState, reset) => {
  setSelectionState((prev) => ({ ...prev, currentChocolateIndex: reset }));
};

export const handleToppingPlacement = (setChocolateInfo, topping, index) => {
  setChocolateInfo((prev) => {
    const updatedToppings = [...prev.toppings];
    updatedToppings[index] = topping;
    return { ...prev, toppings: updatedToppings };
  });
};

export const handleReset = (setChocolateInfo, setUIState) => {
  setChocolateInfo((prev) => ({
    ...prev,
    drawings: [],
    toppings: [],
  }));

  setUIState((prev) => ({
    ...prev,
    isResetPopupOpen: false,
    isClearCanvas: true,
    isResetBtnClicked: !prev.isResetBtnClicked,
  }));
};

export const handleBack = (gameState, setChocolateInfo, selectionState, setUIState) => {
  console.log("현재 선택된 초콜릿 인덱스:", selectionState.currentChocolateIndex); // 인덱스 확인

  if (gameState.historyIndex >= 0) {
    setChocolateInfo((prev) => {
      const strokes = JSON.parse(JSON.stringify(prev.strokes[selectionState.currentChocolateIndex] || []));

      console.log("현재 strokes 상태:", strokes); // 삭제 전 strokes 상태 확인

      if (strokes.length > 0) {
        const updatedStrokes = strokes.slice(0, -1);

        console.log("업데이트된 strokes 상태:", updatedStrokes); // 삭제 후 strokes 상태 확인

        return {
          ...prev,
          strokes: {
            ...prev.strokes,
            [selectionState.currentChocolateIndex]: updatedStrokes,
          },
        };
      }

      return prev;
    });

    setUIState((prev) => ({
      ...prev,
      isBackBtnClicked: true,
    }));
  }
};
