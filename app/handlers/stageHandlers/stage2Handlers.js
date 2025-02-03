export const handleChop = (gameState, setGameState, setUIState, positionState, setPositionState, currentData) => {
  // const toolStep = currentData.tool?.positions.step;

  if (gameState.currentItemIndex < currentData.items?.length - 2) {
    setGameState((prev) => ({ ...prev, currentItemIndex: prev.currentItemIndex + 1 }));
    // setPositionState() // 위치 변경
  }

  if (gameState.currentItemIndex === currentData.items?.length - 3) {
    setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
  }
};
