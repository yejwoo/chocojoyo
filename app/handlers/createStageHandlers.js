import { handleSaveDrawing } from "./generalHandlers";
import { handleSelect } from "./stageHandlers/stage1Handlers";
import { handleChop, handleToolClick } from "./stageHandlers/stage2Handlers";
import { handleStir } from "./stageHandlers/stage3Handlers";
import { handleChocolateClick } from "./stageHandlers/stage4Handlers";

export const createStageHandlers = ({ setChocolateInfo, setUIState, setGameState, setToolState, gameState, selectionState, currentData }) => ({
  1: (type, variant) => handleSelect(variant, setChocolateInfo, setUIState),

  2: (type) => {
    handleChop(gameState, setGameState, setUIState, setToolState, currentData);
    handleToolClick(setToolState);
  },

  3: (type, _, __, e, ref) => {
    handleStir(e, type, ref, gameState, setGameState, setUIState, setToolState);
  },

  4: (type, _, index) => {
    if (type === "chocolateClick") {
      handleChocolateClick(index, selectionState, setChocolateInfo);
    } else if (type === "pressChocolate") {
      handleChocolatePress(index, selectionState, setChocolateInfo);
    }
  },

  5: (type, variant, index) => {
    if (type === "saveDrawing") {
      handleSaveDrawing(variant, setChocolateInfo, index);
    }
  },
});
