export const handleChop = (gameState, setGameState, positionState, setPositionState, currentData) => {
  const toolStep = currentData.tool?.positions.step;

  if (gameState.currentIndex < currentData.items?.length - 1) {
    setGameState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    setPositionState((prev) => ({
      ...prev,
      currentToolPosition: {
        top: prev.currentToolPosition.top,
        right: prev.currentToolPosition.right + toolStep.right,
      },
    }));
  }

  if (gameState.currentIndex === currentData.items?.length - 2) {
    setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
  }
};
