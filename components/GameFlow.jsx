"use client";
import StageLayout from "./layout/StageLayout";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { stageData } from "@/data/Stage";
import TalkBubble from "./TalkBubble";
import { BottomNavi } from "./BottomNavi";
import StageItems from "./StageItems";
import ProgressBar from "./ProgressBar";
import { createActionHandlers } from "@/app/handlers/createActionHandlers";
import { createStageHandlers } from "@/app/handlers/createStageHandlers";
import { useStageState } from "@/app/hooks/useStateState";
import { handleReset } from "@/app/handlers/stageHandlers/stage5Handlers";
import CardLayout from "./layout/CardLayout";
import { handleComplete } from "@/app/handlers/generalHandlers";
import { useRouter } from "next/navigation";
import CustomLoading from "./CustomLoading";
import Image from "next/image";
import { bgCounterTop } from "@/public/images/common";

export default function GameFlow({ currentStep, setCurrentStep }) {
  const { state, setState, intervalRef } = useStageState();
  const { buttonConfig, stage, currentData, selectionState, toolState, chocolateInfo, gameState, uiState } = state;
  const { setStage, setUIState, setToolState, setSelectionState, setGameState, setChocolateInfo } = setState;
  const router = useRouter();

  const stageHandlers = createStageHandlers({
    ...setState,
    gameState,
    selectionState,
    currentData,
    chocolateInfo,
    intervalRef,
  });

  useEffect(() => {
    const handlers = createActionHandlers({ setUIState, handleNextSubStage, handleNextMainStage });

    const runSequence = async () => {
      await delay(1200);
      setUIState((prev) => ({
        ...prev,
        isTalkBubbleShow: true,
      }));

      const { main, sub } = stage;
      const sequence = stageData[main][sub]?.sequence;

      if (stage.main === 1 && stage.sub === "task") {
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

  // 카드 작성 페이지로 넘어갈 때 로딩 추가
  useEffect(() => {
    if (currentStep === "card") {
      setUIState((prev) => ({ ...prev, isCardLoading: true }));
      const timer = setTimeout(() => {
        setUIState((prev) => ({ ...prev, isCardLoading: false }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (stage.main === 5 && uiState.isShowItems) {
      setUIState((prev) => ({ ...prev, isCompleteEvent: true }));
    }
  }, [stage.main, uiState.isShowItems]);

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
      isShowModal: false,
      isShowItems: false,
    }));

    setGameState((prev) => ({
      ...prev,
      currentItemIndex: 0,
    }));
  };

  useEffect(() => {
    console.log("Button Config:", buttonConfig);
  }, [buttonConfig]);

  const handleNextMainStage = () => {
    const { main } = stage;
    const currentStageData = stageData[main];

    if (!currentStageData) {
      console.error(`현재 스테이지 데이터를 찾을 수 없습니다: main=${main}`);
      return;
    }

    if (stage.main === 5) {
      setCurrentStep("card");
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
      isClicked: false,
      isTalkBubbleShow: false,
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

    // 게임 진행 상태 초기화
    setGameState((prev) => ({
      ...prev,
      currentItemIndex: 0,
    }));
  };

  return (
    <>
      {uiState.isCardLoading && <CustomLoading />}
      {currentStep === "stage" && (
        <StageLayout>
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
            >
              <p className="text-center text-2xl mt-6">
                그린 그림과 토핑이 사라져요.
                <br />
                처음부터 다시 꾸밀까요?
              </p>
            </Modal>
          )}

          {/* 얀토 & 말풍선 */}
          <div className="w-full h-[228px] bottom-[286px] max-h-sm:top-[20%] absolute">
            
            {/* @@@@@말풍선 & 버튼 @@@@@ */}
            <div className="absolute w-[214px] h-[164px] right-0 flex flex-col justify-end items-end">
              {/* 말풍선 */}
              <TalkBubble uiState={uiState} dialogue={currentData?.dialogue || "안녕하세요!"} />

              {/* 버튼 */}
              <div
                className={`absolute right-4 z-10 transition duration-300 ease-in-out ${
                  uiState.isCompleteEvent ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <Button
                  // disabled={!uiState.isCompleteEvent}
                  onClick={handleNextMainStage}
                  shape="circle"
                  type="arrow"
                  color="brand"
                />
              </div>
            </div>

            {/* 얀토 */}
            <div className="absolute left-1 w-[40%] max-h-sm:w-[35%] cursor-pointer">
              <Image className="" src={currentData?.imgSrc} alt="얀토" draggable={false} />
            </div>
          </div>

          {/* 카운터 */}
          <Image className="absolute bottom-0 max-h-sm:bottom-[-32px] left-1/2 -translate-x-1/2" src={bgCounterTop} alt="카운터" draggable={false} />

          {/* 스테이지별 메인 아이템 */}
          {uiState.isShowItems && (
            <div id="main-items" className="w-full h-[290px] max-h-sm:h-[200px] absolute bottom-14 flex justify-center items-center animate-bounce-up-once">
              <StageItems state={state} setState={setState} handleEvent={stageHandlers[stage.main]} />
            </div>
          )}

          {/* 상단 네비게이션 */}
          <>
            <Navi uiState={uiState} currentStage={stage.main} completedStages={gameState.completedStages} />
            {stage.main >= 2 && stage.main <= 4 && uiState.isShowItems && (
              <div className="absolute top-[72px] max-h-sm:top-12 left-1/2 -translate-x-1/2 z-10">
                <ProgressBar chocolateInfo={chocolateInfo} gameState={gameState} stageId={stage.main} />
              </div>
            )}
          </>

          {/* 하단 네비게이션 */}
          {stage.sub === "task" && uiState.isShowItems && stage.main >= 4 && (
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
      )}
      {/* ✅ 카드 작성 단계 */}
      {currentStep === "card" && !uiState.isCardLoading && (
        <CardLayout
          chocolateInfo={chocolateInfo}
          onComplete={(formData) => {
            handleComplete(chocolateInfo, formData, router);
            setCurrentStep("share");
          }}
        />
      )}
    </>
  );
}
