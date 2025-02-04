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

export const handleDragStartTopping = (setSelectionState, topping) => {
  setSelectionState((prev) => ({
    ...prev,
    draggingTopping: topping,
  }));
};

export const handleDragEndTopping = (setChocolateInfo, index, x, y) => {
  setChocolateInfo((prev) => {
    const updatedToppings = [...prev.toppings];
    updatedToppings[index] = { name: prev.draggingTopping, x, y };
    return { ...prev, toppings: updatedToppings };
  });
};

export const handleToppingPlacement = (setChocolateInfo, topping, index) => {
  setChocolateInfo((prev) => {
    const updatedToppings = [...prev.toppings];
    updatedToppings[index] = { name: topping, x: 24, y: 22 }; 
    return { ...prev, toppings: updatedToppings };
  });
};
