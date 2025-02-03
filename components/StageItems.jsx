import Stage1Items from "./stageItems/Stage1Items";
import Stage2Items from "./stageItems/Stage2Items";
import Stage3Items from "./stageItems/Stage3Items";
import Stage4Items from "./stageItems/Stage4Items";
import Stage5Items from "./stageItems/Stage5Items";
import Stage6Items from "./stageItems/Stage6Items";

export default function StageItems ({ stage, currentData, handleEvent, selectionState, toolState, chocolateInfo, gameState }) {
    const stageComponents = {
      1: Stage1Items,
      2: Stage2Items,
      3: Stage3Items,
      4: Stage4Items,
      5: Stage5Items,
      6: Stage6Items,
    };
  
    const StageComponent = stageComponents[stage.main];
  
    return StageComponent ? (
      <StageComponent
        currentData={currentData}
        handleEvent={handleEvent}
        selectionState={selectionState}
        toolState={toolState}
        chocolateInfo={chocolateInfo}
        gameState={gameState}
      />
    ) : null;
  };
  