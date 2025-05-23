import Stage1Items from "./stageItems/Stage1Items";
import Stage2Items from "./stageItems/Stage2Items";
import Stage3Items from "./stageItems/Stage3Items";
import Stage4Items from "./stageItems/Stage4Items";
import Stage5Items from "./stageItems/Stage5Items";

export default function StageItems({ state, setState, handleEvent }) {
  const stageComponents = {
    1: Stage1Items,
    2: Stage2Items,
    3: Stage3Items,
    4: Stage4Items,
    5: Stage5Items,
  };

  const StageComponent = stageComponents[state.stage.main];

  return StageComponent ? (
    <StageComponent {...state} {...setState} handleEvent={handleEvent} />
  ) : null;
}
