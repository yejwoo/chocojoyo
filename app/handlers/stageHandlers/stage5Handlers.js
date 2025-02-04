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
