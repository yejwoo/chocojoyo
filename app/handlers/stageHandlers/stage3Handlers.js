export const handleStir = (e, actionType, rotationRef, gameState, setGameState, setUIState, setToolState) => {
  const completeCount = 6;

  if (!actionType) {
    console.warn("Unknown stir action:", actionType);
    return;
  }

  switch (actionType) {
    case "stirStart":
      if (rotationRef.current || gameState.stirCount >= completeCount) return; 

      rotationRef.current = true; // 회전 중 상태로 변경
      setUIState((prev) => ({ ...prev, isRotating: true }));

      const centerX = 80; // 원 중심 X
      const centerY = 48; // 원 중심 Y
      const radius = 30; // 원 반지름
      let startTime = null;
      const duration = 700; 
      let chocolateRotation = 0; // 초콜릿 덩어리 회전값

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const angle = progress * 2 * Math.PI; // 원을 도는 각도
        chocolateRotation += 5; // 초콜릿 덩어리 점진적 회전

        setToolState((prev) => ({
          ...prev,
          position: {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          },
          rotation: prev.rotation + 3.6, // 스패츌라 회전
          chocolateRotation: prev.chocolateRotation + 5, // 초콜릿 덩어리 점진적 회전
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setToolState((prev) => ({
            ...prev,
            position: { x: centerX, y: centerY },
          }));

          setUIState((prev) => ({ ...prev, isRotating: false }));
          rotationRef.current = false; // 🔥 회전 종료 (중복 실행 방지)

          // 🔥 회전 횟수 업데이트 (10회를 넘지 않도록 제한)
          const nextCount = Math.min(gameState.stirCount + 1, completeCount);
          setGameState((prev) => ({
            ...prev,
            stirCount: nextCount,
            currentItemIndex: nextCount === completeCount / 2 || nextCount === completeCount ? prev.currentItemIndex + 1 : prev.currentItemIndex,
          }));

          if (nextCount >= completeCount) {
            setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
          }
        }
      };

      requestAnimationFrame(animate);
      break;

    default:
      console.warn("Unknown stir action:", actionType);
  }
};
