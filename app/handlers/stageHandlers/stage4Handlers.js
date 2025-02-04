// handleChocolateClick(index, selectionState, setChocolateInfo);
export const handleChocolateClick = (index, selectionState, setChocolateInfo) => {
  setChocolateInfo((prev) => {
    const updatedColors = [...prev.colors];
    if (prev.sizes[index] < 100) {
      updatedColors[index] = selectionState.currentColor;
    }
    return { ...prev, colors: updatedColors };
  });
};

export const handleChocolatePress = (index, selectionState, setChocolateInfo, setSelectionState, intervalRef) => {
  console.log("Pressed Index:", index);

  if (!setSelectionState) {
    console.error("setSelectionState is undefined!");
    return;
  }

  setSelectionState((prev) => ({
    ...prev,
    currentChocolateIndex: index,
  }));

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(() => {
    setChocolateInfo((prev) => {
      const updatedSizes = [...prev.sizes];
      if (updatedSizes[index] < 100) {
        updatedSizes[index] += 10;
      }
      return { ...prev, sizes: updatedSizes };
    });
  }, 100);

  const stopGrowing = () => {
    console.log("Stopped Pressing");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  window.addEventListener("mouseup", stopGrowing);
  window.addEventListener("touchend", stopGrowing);
};
