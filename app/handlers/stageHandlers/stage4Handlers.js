export const handleChocolateClick = (index, selectionState, setChocolateInfo) => {
    setChocolateInfo((prev) => {
      const updatedColors = [...prev.colors];
      if (prev.sizes[index] < 100) {
        updatedColors[index] = selectionState.currentColor;
      }
      return { ...prev, colors: updatedColors };
    });
  };
  
  export const handleChocolatePress = (index, selectionState, setChocolateInfo) => {
    if (index !== selectionState.currentChocolateIndex) return;
  
    handleChocolateClick(index, selectionState, setChocolateInfo);
  
    let interval = setInterval(() => {
      setChocolateInfo((prev) => {
        const updatedSizes = [...prev.sizes];
        if (updatedSizes[index] < 100) {
          updatedSizes[index] += 10;
        }
        return { ...prev, sizes: updatedSizes };
      });
    }, 100);
  
    const stopGrowing = () => {
      clearInterval(interval);
    };
  
    window.addEventListener("mouseup", stopGrowing);
    window.addEventListener("touchend", stopGrowing);
  };
  