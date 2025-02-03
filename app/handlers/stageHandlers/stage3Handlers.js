export const handleStir = (e, actionType, gameState, setGameState, setUIState, setToolState) => {
  if (!actionType) {
    console.warn("Unknown stir action:", actionType);
    return;
  }

  switch (actionType) {
    case "stirStart":
      const { currentItemIndex } = gameState;
      const nextIndex = currentItemIndex + 1;

      setUIState((prev) => {
        if (prev.isRotating) return prev; // 이미 회전 중이면 중복 실행 방지
        return { ...prev, isRotating: true };
      });

      setToolState((prev) => ({
        ...prev,
        rotation: prev.rotation + 20, // 회전 적용
      }));

      setTimeout(() => {
        setUIState((prev) => ({ ...prev, isRotating: false })); // 회전 가능 상태로 복귀
      }, 500); // 0.5초 후 회전 가능

      // 회전 횟수 증가
      const nextCount = gameState.stirCount + 1;
      setGameState((prev) => ({
        ...prev,
        stirCount: nextCount,
      }));

      if(nextCount === 5 || nextCount === 10) {
        // currentItemIndex: nextIndex,
        setGameState((prev) => ({
          ...prev,
          currentItemIndex: nextIndex,
        }))
      }

      // 10회 이상이면 클리어 처리
      if (nextCount >= 10) {
        setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
      }
      break;

    default:
      console.warn("Unknown stir action:", actionType);
  }
};
