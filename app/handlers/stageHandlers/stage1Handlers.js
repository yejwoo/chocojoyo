export const handleSelect = (variant, setChocolateInfo, setUIState) => {
  setChocolateInfo((prev) => {
    const updatedShapes = prev.shapes.includes(variant)
      ? prev.shapes.filter((item) => item !== variant)
      : [...prev.shapes, variant];

    setUIState((prev) => ({ ...prev, isCompleteEvent: updatedShapes.length > 0 }));
    return { ...prev, shapes: updatedShapes };
  });
};
