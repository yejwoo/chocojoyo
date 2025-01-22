export const extractStageNumber = (stageString) => {
    return parseInt(stageString.replace("stage", ""), 10);
};
