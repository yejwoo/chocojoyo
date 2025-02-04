
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
  