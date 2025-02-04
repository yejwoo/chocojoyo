import { handleSaveDrawing } from "./generalHandlers";
import { handleSelect } from "./stageHandlers/stage1Handlers";
import { handleChop, handleToolClick } from "./stageHandlers/stage2Handlers";
import { handleStir } from "./stageHandlers/stage3Handlers";
import { handleChocolateClick, handleChocolatePress } from "./stageHandlers/stage4Handlers";

export const createStageHandlers = ({
  setChocolateInfo,
  setUIState,
  setGameState,
  setToolState,
  setSelectionState,
  gameState,
  selectionState,
  currentData,
  intervalRef,
}) => ({
  1: (type, variant) => handleSelect(variant, setChocolateInfo, setUIState),

  2: (type) => {
    handleChop(gameState, setGameState, setUIState, setToolState, currentData);
    handleToolClick(setToolState);
  },

  3: (type, _, __, e, ref) => {
    handleStir(e, type, ref, gameState, setGameState, setUIState, setToolState);
  },

  4: (type, _, index) => {
    if (type === "click") {
      handleChocolateClick(index, selectionState, setChocolateInfo);
    } else if (type === "press") {
      handleChocolatePress(index, selectionState, setChocolateInfo, setSelectionState, intervalRef); // ✅ 올바르게 전달
    }
  },

  5: (type, variant, index) => {
    if (type === "saveDrawing") {
      handleSaveDrawing(variant, setChocolateInfo, index);
    }
  },
});
