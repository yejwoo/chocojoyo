import StageLayout from "./StageLayout";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { bg } from "@/public/images/common";
import { stageData } from "@/data/Stage";
import TalkBubble from "./TalkBubble";
import { BottomNavi } from "./BottomNavi";
import StageItems from "./StageItems";
import ProgressBar from "./ProgressBar";
import { createActionHandlers } from "@/app/handlers/createActionHandlers";
import { createStageHandlers } from "@/app/handlers/createStageHandlers";

export default function Stage() {
  const [stage, setStage] = useState({ main: 1, sub: "init" });
  const [buttonConfig, setButtonConfig] = useState({
    shape: "rectangle",
    type: null,
    message: "",
  });

  const currentData = stageData[stage.main][stage.sub];

  // 💝 UI 상태
  const [uiState, setUIState] = useState({
    isTalkBubbleShow: false,
    isShowButton: false,
    isShowModal: false,
    isShowItems: false,
    isShowNavi: false,
    isCompleteEvent: false,
    isDragging: false,
    isRotating: false,
    isSubmitEnabled: false,
    isZoomMode: false,
  });

  // 💝 현재 선택 관련 상태
  const [selectionState, setSelectionState] = useState({
    currentChocolateIndex: null,
    currentTabIndex: 0,
    currentColor: "vanilla",
    currentTopping: "",
  });

  // 💝 툴 관련 상태
  const [toolState, setToolState] = useState({
    position: { x: 0, y: 0 },
    size: 1,
    rotation: 0,
  });

  // 💝 초콜릿 정보
  // const [chocolateInfo, setChocolateInfo] = useState({
  //   shapes: [],
  //   colors: [],
  //   sizes: [],
  //   drawings: [],
  //   toppings: [],
  //   box: "", // 컬러 인덱스?
  // });

  // 💝 TEST용 더미 데이터
  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: ["heart", "heart", "heart", "heart", "heart", "heart"],
    colors: [],
    sizes: [],
    drawings: [],
    toppings: [],
    box: "", // 컬러 인덱스?
  });

  // 💝 게임 진행 상태
  const [gameState, setGameState] = useState({
    currentItemIndex: 0,
    completedStages: [],
    stirCount: 0,
  });

  // 💝 폼 관련 정보
  const [formState, setFormState] = useState({
    inputValue: "",
    username: "",
    card: "",
  });

  const stageHandlers = createStageHandlers({
    setChocolateInfo,
    setUIState,
    setGameState,
    setToolState,
    gameState,
    selectionState,
    currentData,
  });

  useEffect(() => {
    const handlers = createActionHandlers({ setUIState, setButtonConfig, handleNextSubStage, handleNextMainStage });

    const runSequence = async () => {
      await delay(1200);
      setUIState((prev) => ({
        ...prev,
        isTalkBubbleShow: true,
      }));

      const { main, sub } = stage;
      const sequence = stageData[main][sub]?.sequence;

      if (stage.main === 1 && stage.sub === "description") {
        setUIState((prev) => ({
          ...prev,
          isShowNavi: true,
        }));
      }

      if (sequence) {
        for (let action of sequence) {
          const handler = handlers[action.type];
          if (handler) {
            await handler(action.value);
          } else {
            console.warn(`Unhandled action type: ${action.type}`);
          }
        }
      }
    };

    runSequence();
    console.log("Stage Info: ", stage);
  }, [stage]);

  useEffect(() => {
    console.log("💝 chocolateInfo", chocolateInfo);
  }, [chocolateInfo]);

  useEffect(() => {
    if (currentData?.items?.length > 0) {
      setToolState((prev) => ({
        ...prev,
        position: {
          x: currentData.items[0].position?.x || prev.position.x,
          y: currentData.items[0].position?.y || prev.position.y,
        },
      }));
    }
  }, [currentData]);

  useEffect(() => {
    if (stage.main >= 3) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [stage.main, chocolateInfo.shapes]);

  // 스테이지 관리
  // @TODO: handlers 폴더로 이동
  const handleNextSubStage = () => {
    const { main, sub } = stage;
    const currentStageData = stageData[main];

    if (!currentStageData || !currentStageData[sub]) {
      console.error(`스테이지 데이터를 찾을 수 없습니다: main=${main}, sub=${sub}`);
      return;
    }

    const nextSubStage = currentStageData[sub]?.nextSubStage;

    if (nextSubStage) {
      setStage((prev) => ({ ...prev, sub: nextSubStage }));
    } else {
      handleNextMainStage();
    }

    setUIState((prev) => ({
      ...prev,
      isTalkBubbleShow: false,
      isShowButton: false,
      isShowModal: false,
      isShowItems: false,
    }));

    setGameState((prev) => ({
      ...prev,
      currentItemIndex: 0,
    }));
  };

  const handleNextMainStage = () => {
    const { main } = stage;
    const currentStageData = stageData[main];

    if (!currentStageData) {
      console.error(`현재 스테이지 데이터를 찾을 수 없습니다: main=${main}`);
      return;
    }

    setGameState((prev) => ({
      ...prev,
      completedStages: [...prev.completedStages, main],
    }));

    // 'isFinal: true' 서브 스테이지 찾기
    const isFinalStage = Object.values(currentStageData).some((stage) => stage?.isFinal);

    if (!isFinalStage) {
      console.warn(`isFinal 서브스테이지를 찾을 수 없습니다: main=${main}`);
      return;
    }

    // 다음 메인 스테이지로 이동
    const nextMainStage = main + 1;

    if (nextMainStage >= stageData.length) {
      console.log("더 이상 진행할 스테이지 없음");
      return;
    }

    setStage({ main: nextMainStage, sub: "init" });

    // 초콜릿 개수가 6개 미만이면 반복해서 채우기
    setChocolateInfo((prev) => {
      if (prev.shapes.length > 0 && prev.shapes.length < 6) {
        const repeatedShapes = Array.from({ length: 6 }, (_, i) => prev.shapes[i % prev.shapes.length]);
        return { ...prev, shapes: repeatedShapes };
      }
      return prev;
    });

    // UI 상태 초기화
    setUIState((prev) => ({
      ...prev,
      isTalkBubbleShow: false,
      isShowButton: false,
      isShowModal: false,
      isShowItems: false,
      isCompleteEvent: false,
    }));

    // 선택 상태 초기화
    setSelectionState((prev) => ({
      ...prev,
      currentChocolateIndex: nextMainStage === 5 ? null : 0,
      currentColor: "vanilla",
    }));

    // 버튼 상태 초기화
    setButtonConfig({
      shape: "rectangle",
      type: null,
      message: "",
    });

    // 게임 진행 상태 초기화
    setGameState((prev) => ({
      ...prev,
      currentItemIndex: 0,
    }));
  };

  const handleEvent = (type, variant, index, e, ref) => {
    const handler = stageHandlers[stage.main];

    if (handler) {
      handler(type, variant, index, e, ref);
    } else {
      console.warn("Unhandled stage:", stage.main);
    }
  };

  return (
    <StageLayout
      backgroundSrc={bg}
      characterSrc={currentData?.imgSrc}
      modalContent={
        uiState.isShowModal && (
          <Modal
            title={modalConfig.title}
            type={modalConfig.type}
            maxLength={modalConfig.maxLength}
            value={formState.inputValue}
            // onChange={handleInputChange}
            // onClose={handleCloseModal}
          >
            <Button message={"작성 완료"} size="full" disabled={!uiState.isSubmitEnabled} onClick={handleFormData} />
          </Modal>
        )
      }
    >
      {/* 말풍선 */}
      {uiState.isTalkBubbleShow && <TalkBubble dialogue={currentData?.dialogue || "안녕하세요!"} />}

      {/* 스테이지별 메인 아이템 */}
      {uiState.isShowItems && (
        <div id="main-items" className="absolute bottom-[120px] left-1/2 w-[296px] -translate-x-1/2 flex justify-center gap-6 flex-wrap animate-bounce-up-once">
          <StageItems
            currentData={currentData}
            stage={stage}
            handleEvent={handleEvent}
            selectionState={selectionState}
            toolState={toolState}
            chocolateInfo={chocolateInfo}
            gameState={gameState}
            uiState={uiState}
          />
        </div>
      )}

      {/* 버튼 */}
      {uiState.isShowButton && (
        <div className="absolute right-3 bottom-[360px]">
          <Button
            disabled={!uiState.isCompleteEvent}
            onClick={handleNextMainStage}
            shape={buttonConfig.shape}
            type={buttonConfig.type}
            message={buttonConfig.message}
          />
        </div>
      )}

      {/* 상단 네비게이션 */}
      {uiState.isShowNavi && (
        <>
          <Navi currentStage={stage.main} completedStages={gameState.completedStages} />
          {(stage.main === 2 || stage.main === 3) && (
            <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-10">
              <ProgressBar gameState={gameState} totalItems={stage.main === 2 ? currentData.items.length - 1 : 8} stageId={stage.main} />
            </div>
          )}
        </>
      )}

      {/* 하단 네비게이션 */}
      {/* && stage.sub === "description" -> 이 조건은 대사 다 정하고 추가 */}
      {uiState.isShowItems && stage.main >= 4 && <BottomNavi stage={stage.main} selectionState={selectionState} setSelectionState={setSelectionState} />}
    </StageLayout>
  );
}
