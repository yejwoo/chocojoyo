export const handleSaveDrawing = (imageData, setChocolateInfo, currentChocolateIndex) => {
    setChocolateInfo((prev) => ({
      ...prev,
      drawings: {
        ...prev.drawings,
        [currentChocolateIndex]: imageData,
      },
    }));
  };
  