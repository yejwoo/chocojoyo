import { delay } from "@/utils/delay";

export const createActionHandlers = ({ setUIState, setButtonConfig, handleNextSubStage, handleNextMainStage }) => ({
  delay: async (value) => await delay(value),

  showButton: (value) => {
    setUIState((prev) => ({
      ...prev,
      isShowButton: true,
    }));

    setButtonConfig({
      shape: value.shape,
      type: value.type,
      message: value.message,
    });
  },

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
