import StageLayout from "./StageLayout";
import React, { useEffect } from "react";
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
import { useStageState } from "@/app/hooks/useStateState";
import { handleReset } from "@/app/handlers/stageHandlers/stage5Handlers";

export default function Stage({ onComplete }) {
  const { state, setState, intervalRef } = useStageState();
  const { buttonConfig, stage, currentData, selectionState, toolState, chocolateInfo, gameState, uiState } = state;
  const { setStage, setButtonConfig, setUIState, setToolState, setSelectionState, setGameState, setChocolateInfo } = setState;

  const stageHandlers = createStageHandlers({
    ...setState,
    gameState,
    selectionState,
    currentData,
    chocolateInfo,
    intervalRef,
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

  // 온보딩
  // useEffect(() => {
  //   if (stage.main === 5 && stage.sub === "init") {
  //     setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
  //     const runOnboarding = async () => {
  //       await delay(5000);
  //       setUIState((prev) => ({
  //         ...prev,
  //         isOnboarding: true,
  //         highlightedElement: "item0",
  //       }));
  //       await delay(3000);

  //       setUIState((prev) => ({
  //         ...prev,
  //         highlightedElement: "item1",
  //       }));
  //       await delay(3000);

  //       setUIState((prev) => ({
  //         ...prev,
  //         highlightedElement: "item2",
  //       }));
  //       await delay(3000);

  //       setUIState((prev) => ({
  //         ...prev,
  //         isOnboarding: false,
  //         highlightedElement: null,
  //       }));
  //     };

  //     runOnboarding();
  //   }
  // }, [stage]);

  useEffect(() => {
    if (stage.main === 5 && stage.sub === "init") {
      setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
    }
  }, [stage]);

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

    if (main === 5) {
      console.log("✅ 스테이지 5 완료 → 카드 작성 단계로 이동");
      onComplete();
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
      isCompleteEvent: stage.main === 5 ? true : false, // 5단계 꾸미기는 선택이므로
    }));

    // 선택 상태 초기화
    setSelectionState((prev) => ({
      ...prev,
      currentChocolateIndex: nextMainStage === 5 ? null : 0,
      currentColor: "milk",
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

  return (
    <StageLayout backgroundSrc={bg} characterSrc={currentData?.imgSrc}>
      {/* 온보딩 오버레이 */}
      {uiState.isOnboarding && <div className="absolute inset-0 bg-black bg-opacity-60 z-40"></div>}

      {uiState.isResetPopupOpen && (
        <Modal
          type="confirm"
          title="초콜릿 다시 꾸미기"
          onCancel={() => setUIState((prev) => ({ ...prev, isResetPopupOpen: false, isResetBtnClicked: !prev.isResetBtnClicked, isZoomMode: false }))}
          onConfirm={() => {
            handleReset(setChocolateInfo, setUIState);
            setUIState((prev) => ({
              ...prev,
              isZoomMode: false, // 리셋할 때도 줌 해제
            }));
          }}
        />
      )}

      {/* 말풍선 */}
      <TalkBubble uiState={uiState} dialogue={currentData?.dialogue || "안녕하세요!"} />

      {/* 스테이지별 메인 아이템 */}
      {uiState.isShowItems && (
        <div id="main-items" className="w-full h-[290px] absolute bottom-14 flex justify-center items-center animate-bounce-up-once">
          <StageItems state={state} setState={setState} handleEvent={stageHandlers[stage.main]} />
        </div>
      )}

      {/* 버튼 */}
      <div
        className={`absolute right-5 bottom-[324px] transition duration-300 ease-in-out ${
          uiState.isShowButton && uiState.isCompleteEvent ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Button
          // disabled={!uiState.isCompleteEvent}
          onClick={handleNextMainStage}
          shape={buttonConfig.shape}
          type={buttonConfig.type}
          message={buttonConfig.message}
        />
      </div>

      {/* 상단 네비게이션 */}
      <>
        <Navi uiState={uiState} currentStage={stage.main} completedStages={gameState.completedStages} />
        {stage.main >= 2 && stage.main <= 4 && (
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-10">
            <ProgressBar chocolateInfo={chocolateInfo} gameState={gameState} totalItems={currentData.items.length - 1} stageId={stage.main} />
          </div>
        )}
      </>

      {/* 하단 네비게이션 */}
      {/* && stage.sub === "description" -> 이 조건은 대사 다 정하고 추가 */}
      {uiState.isShowItems && stage.main >= 4 && (
        <BottomNavi
          stage={stage}
          selectionState={selectionState}
          setSelectionState={setSelectionState}
          uiState={uiState}
          setUIState={setUIState}
          setChocolateInfo={setChocolateInfo}
        />
      )}
    </StageLayout>
  );
}
