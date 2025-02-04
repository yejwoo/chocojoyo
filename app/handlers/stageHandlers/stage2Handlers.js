export const handleChop = (gameState, setGameState, setUIState, setToolState, currentData) => {
  const { currentItemIndex } = gameState;
  const nextIndex = currentItemIndex + 1;

  if (nextIndex < currentData.items.length - 1) {
    const nextItem = currentData.items[nextIndex];

    setGameState((prev) => ({ ...prev, currentItemIndex: nextIndex }));
    setToolState((prev) => ({
      ...prev,
      position: { x: nextItem.position.x, y: nextItem.position.y },
    }));
  }

  if (nextIndex === currentData.items.length - 2) {
    setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
  }
};

export const handleToolClick = (setToolState, sizeFactor = 0.8, rotationStep = -10, resetDelay = 200) => {
  setToolState((prev) => ({
    ...prev,
    size: prev.size * sizeFactor,
    rotation: prev.rotation + rotationStep,
  }));

  setTimeout(() => {
    setToolState((prev) => ({
      ...prev,
      size: 1,
      rotation: 0,
    }));
  }, resetDelay);
};
