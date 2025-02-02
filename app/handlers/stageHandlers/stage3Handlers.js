export const handleStir = (gameState, setGameState, setUIState) => {
    const nextCount = gameState.stirCount + 1;
  
    if (nextCount <= 10) {
      setGameState((prev) => ({ ...prev, stirCount: nextCount }));
    }
  
    if (nextCount === 10) {
      setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
    }
  };
  