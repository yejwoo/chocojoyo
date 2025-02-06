'use client';

import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation';

export const handleTabClick = (index, selectionState, setSelectionState, uiState, setUIState) => {
  setSelectionState((prev) => ({ ...prev, currentTabIndex: index }));

  if (uiState.isZoomMode && index === 1) {
    setUIState((prev) => ({ ...prev, isZoomMode: false }));
  }
};

export const handleColorSelection = (color, setSelectionState) => {
  setSelectionState((prev) => ({ ...prev, currentColor: color }));
};

export const handleToppingSelection = (topping, setSelectionState) => {
  setSelectionState((prev) => ({ ...prev, currentTopping: topping }));
};

export const handleComplete = (chocolateInfo, formData, router) => { // router를 인자로 받음
  const id = uuidv4();
  const cardData = { id, ...chocolateInfo, ...formData };
  sessionStorage.setItem("card-data", JSON.stringify(cardData)); 
  
  router.push(`/?id=${id}`);
};