import { handleSelect } from "./stageHandlers/stage1Handlers";
import { handleChop, handleToolClick } from "./stageHandlers/stage2Handlers";
import { handleStir } from "./stageHandlers/stage3Handlers";
import { handleChocolateClick, handleChocolatePress, updatePastryBagPosition, updatePastryBagVisibility } from "./stageHandlers/stage4Handlers";
import { handleZoomMode, handleMouseLeave, handleMouseOver, handleSaveDrawing } from "./stageHandlers/stage5Handlers";

export const createStageHandlers = (store) => {
  const { setChocolateInfo, setUIState, setGameState, setToolState, setSelectionState, chocolateInfo, gameState, selectionState, currentData, intervalRef } =
    store;

  return {
    1: (type, variant) => handleSelect(variant, setChocolateInfo, setUIState),

    2: (type) => {
      handleChop(gameState, setGameState, setUIState, setToolState, currentData);
      handleToolClick(setToolState);
    },

    3: (type, _, __, e, ref) => {
      handleStir(e, type, ref, gameState, setGameState, setUIState, setToolState);
    },

    4: (type, _, index) => {
      const handlers = {
        click: () => handleChocolateClick(index, selectionState, setChocolateInfo),
        press: () => handleChocolatePress(index, setChocolateInfo, selectionState, setSelectionState, intervalRef),
      };

      if (handlers[type]) handlers[type]();

      updatePastryBagVisibility(chocolateInfo, setUIState);
      updatePastryBagPosition(selectionState, chocolateInfo, currentData, setSelectionState, setToolState, setUIState);
    },

    5: (type, variant, index) => {
      const handlers = {
        mouseOver: () => handleMouseOver(setSelectionState, index),
        mouseLeave: () => handleMouseLeave(setSelectionState, null),
        zoomMode: () => handleZoomMode(setUIState),
        saveDrawing: () => handleSaveDrawing(variant, setChocolateInfo, selectionState.currentChocolateIndex),
      };

      if (handlers[type]) handlers[type]();
    },
  };
};
