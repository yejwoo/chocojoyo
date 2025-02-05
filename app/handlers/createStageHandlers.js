import { handleSelect } from "./stageHandlers/stage1Handlers";
import { handleChop, handleToolClick } from "./stageHandlers/stage2Handlers";
import { handleStir } from "./stageHandlers/stage3Handlers";
import { handleChocolateClick, handleChocolatePress, updatePastryBagPosition, updatePastryBagVisibility } from "./stageHandlers/stage4Handlers";
import {
  handleMouseLeave,
  handleMouseOver,
  handleSaveDrawing,
  handleDragEndTopping,
  handleDragStartTopping,
  handleToppingPlacement,
} from "./stageHandlers/stage5Handlers";

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

    5: (type, imageData, index, x, y) => {
      console.log("🔥 `createStageHandlers` 실행됨! type:", type, "imageData:", imageData, "index:", index);

      const handlers = {
        mouseOver: () => handleMouseOver(setSelectionState, index),
        mouseLeave: () => handleMouseLeave(setSelectionState, null),
        saveDrawing: (imageData) => {
          console.log("🖼 saveDrawing 실행됨! imageData:", imageData, "index:", index);

          const validImageData = imageData || "data:image/png;base64,"; // 기본값 설정

          handleSaveDrawing(validImageData, setChocolateInfo, index);
        },
        clickTopping: () => handleToppingPlacement(setChocolateInfo, selectionState.currentTopping, index),
      };

      if (handlers[type]) {
        console.log("✅ 핸들러 실행: ", type);
      
        if (type === "saveDrawing" && !imageData) {
          console.error("❌ saveDrawing 실행 전에 imageData가 undefined입니다!");
          return;
        }
      
        handlers[type](imageData);
      } else {
        console.error(`❌ 이벤트 핸들러 없음! type: ${type}`);
      }
      
    },
  };
};
