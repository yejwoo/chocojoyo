import { handleSaveDrawing } from "./generalHandlers";
import { handleSelect } from "./stageHandlers/stage1Handlers";
import { handleChop, handleToolClick } from "./stageHandlers/stage2Handlers";
import { handleStir } from "./stageHandlers/stage3Handlers";
import {
  handleChocolateClick,
  handleChocolatePress,
  updatePastryBagPosition,
  updatePastryBagVisibility,
} from "./stageHandlers/stage4Handlers";

export const createStageHandlers = (store) => {
  const {
    setChocolateInfo,
    setUIState,
    setGameState,
    setToolState,
    setSelectionState,
    chocolateInfo,
    gameState,
    selectionState,
    currentData,
    intervalRef,
  } = store;

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
      updatePastryBagPosition(selectionState, currentData, setToolState);
    },

    5: (type, variant, index) => {
      if (type === "saveDrawing") {
        handleSaveDrawing(variant, setChocolateInfo, index);
      }
    },
  };
};
