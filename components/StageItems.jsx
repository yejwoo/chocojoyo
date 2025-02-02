import Stage1Items from "./stageItems/Stage1Items";
import Stage2Items from "./stageItems/Stage2Items";
import Stage3Items from "./stageItems/Stage3Items";
import Stage4Items from "./stageItems/Stage4Items";
import Stage5Items from "./stageItems/Stage5Items";
import Stage6Items from "./stageItems/Stage6Items";

export default function StageItems ({ stage, currentData, handleEvent, selectionState, positionState }) {
    const stageComponents = {
      stage1: Stage1Items,
      stage2: Stage2Items,
      stage3: Stage3Items,
      stage4: Stage4Items,
      stage5: Stage5Items,
      stage6: Stage6Items,
    };
  
    const StageComponent = stageComponents[stage.main];
  
    return StageComponent ? (
      <StageComponent
        currentData={currentData}
        handleEvent={handleEvent}
        selectionState={selectionState}
        positionState={positionState}
      />
    ) : null;
  };
  