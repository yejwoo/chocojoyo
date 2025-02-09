import { ZOOM_SCALE } from "@/utils/constants";

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

export const handleTouchMove = (e, index, isZoomMode = false) => {
  const touch = e.touches[0];
  const toppingElement = e.target;

  // 부모 컨테이너 찾기 (확대된 경우에도 포함)
  const parentContainer = toppingElement.parentElement;
  const parentRect = parentContainer.getBoundingClientRect();

  // 확대 비율 고려
  const scale = isZoomMode ? ZOOM_SCALE : 1;

  // 터치 위치 계산 (확대된 부모 컨테이너 기준)
  let offsetX = (touch.clientX - parentRect.left) / scale;
  let offsetY = (touch.clientY - parentRect.top) / scale;

  const toppingWidth = toppingElement.offsetWidth / 2;
  const toppingHeight = toppingElement.offsetHeight / 2;

  // **부모 컨테이너 경계 내로 제한**
  offsetX = Math.max(toppingWidth, Math.min(offsetX, 64 - toppingWidth));
  offsetY = Math.max(toppingHeight, Math.min(offsetY, 56 - toppingHeight));

  // **스타일로 위치만 변경 (데이터는 업데이트 X)**
  toppingElement.style.left = `${offsetX}px`;
  toppingElement.style.top = `${offsetY}px`;
};

export const handleTouchEnd = (e, index, setChocolateInfo, isZoomMode = false) => {
  const touch = e.changedTouches[0];
  const toppingElement = e.target;

  // 부모 컨테이너 찾기 (확대된 경우에도 포함)
  const parentContainer = toppingElement.parentElement;
  const parentRect = parentContainer.getBoundingClientRect();

  // 확대 비율 고려
  const scale = isZoomMode ? ZOOM_SCALE : 1;

  // 터치 종료 시 위치 계산 (확대된 부모 컨테이너 기준)
  let offsetX = (touch.clientX - parentRect.left) / scale;
  let offsetY = (touch.clientY - parentRect.top) / scale;

  const toppingWidth = toppingElement.offsetWidth / 2;
  const toppingHeight = toppingElement.offsetHeight / 2;

  // **부모 컨테이너 경계 내로 제한**
  offsetX = Math.max(toppingWidth, Math.min(offsetX, 64 - toppingWidth));
  offsetY = Math.max(toppingHeight, Math.min(offsetY, 56 - toppingHeight));

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
