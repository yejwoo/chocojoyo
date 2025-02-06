import { delay } from "@/utils/delay";

export const createActionHandlers = ({ setUIState, handleNextSubStage, handleNextMainStage }) => ({
  delay: async (value) => await delay(value),

  showModal: () =>
    setUIState((prev) => ({
      ...prev,
      isShowModal: true,
    })),

  showItems: () =>
    setUIState((prev) => ({
      ...prev,
      isShowItems: true,
    })),

  highlightElement: (element) =>
    setUIState((prev) => ({
      ...prev,
      highlightedElement: element,
      isOnboarding: true, 
    })),

  endOnboarding: () =>
    setUIState((prev) => ({
      ...prev,
      isOnboarding: false,
      highlightedElement: null,
    })),

  nextSubStage: () => handleNextSubStage(),
  nextMainStage: () => handleNextMainStage(),
});
