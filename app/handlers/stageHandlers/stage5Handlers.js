export const handleSaveDrawing = (imageData, setChocolateInfo, currentChocolateIndex) => {
  if (typeof setChocolateInfo !== "function") {
    console.error("❌ setChocolateInfo가 함수가 아님!", setChocolateInfo);
    return;
  }

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
