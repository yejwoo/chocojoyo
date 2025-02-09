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

    updatedToppings[index] = {
      name: topping,
      x: updatedToppings[index]?.x || 32,
      y: updatedToppings[index]?.y || 26,
    };

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

export const handleTouchStart = (e, index) => {
  const touch = e.touches[0];
  // console.log(`터치 시작 - 인덱스: ${index}, 위치: (${touch.clientX}, ${touch.clientY})`);
};

export const handleTouchMove = (e, index) => {
  const touch = e.touches[0];
  const toppingElement = e.target;

  // 캔버스 요소 찾기
  const canvasElement = toppingElement.previousSibling;
  const canvasRect = canvasElement.getBoundingClientRect();

  // 터치 위치 계산 (캔버스 기준)
  let offsetX = touch.clientX - canvasRect.left;
  let offsetY = touch.clientY - canvasRect.top;

  const toppingWidth = toppingElement.offsetWidth / 2;
  const toppingHeight = toppingElement.offsetHeight / 2;

  // **캔버스 경계 내로 제한**
  offsetX = Math.max(toppingWidth, Math.min(offsetX, canvasRect.width - toppingWidth));
  offsetY = Math.max(toppingHeight, Math.min(offsetY, canvasRect.height - toppingHeight));

  // **스타일로 위치만 변경 (데이터는 업데이트 X)**
  toppingElement.style.left = `${offsetX}px`;
  toppingElement.style.top = `${offsetY}px`;
};

export const handleTouchEnd = (e, index, setChocolateInfo) => {
  const touch = e.changedTouches[0];
  const toppingElement = e.target;
  const chocolateBox = toppingElement.parentElement;

  const boxRect = chocolateBox.getBoundingClientRect();

  // 터치 종료 시 위치 계산
  let offsetX = touch.clientX - boxRect.left;
  let offsetY = touch.clientY - boxRect.top;

  const toppingWidth = toppingElement.offsetWidth / 2;
  const toppingHeight = toppingElement.offsetHeight / 2;

  // **박스 경계 내로 제한**
  offsetX = Math.max(toppingWidth, Math.min(offsetX, boxRect.width - toppingWidth));
  offsetY = Math.max(toppingHeight, Math.min(offsetY, boxRect.height - toppingHeight));

  // console.log(`터치 끝 - 인덱스: ${index}, 위치: (${offsetX}, ${offsetY})`);

  // 터치 종료 후 위치 저장
  setChocolateInfo((prev) => {
    const updatedToppings = [...prev.toppings];
    updatedToppings[index] = {
      ...updatedToppings[index],
      x: offsetX,
      y: offsetY,
    };
    return { ...prev, toppings: updatedToppings };
  });
};
