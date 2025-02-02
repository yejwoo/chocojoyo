import StageLayout from "./StageLayout";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { extractStageNumber } from "@/utils/extractStageNumber";
import { debug } from "@/utils/debug";
import { bg } from "@/public/images/common";
import { bottomNaviConfig, stageData } from "@/data/Stage";
import { Shapes } from "@/public/icons/shapes";
import mold from "@/public/images/stage4/chocolate-mold.svg";
import box from "@/public/images/stage5/box.svg";
import { PastryBag } from "@/public/images/stage4";
import { ChocoPen } from "@/public/images/stage5/chocopen";
import Canvas from "./Canvas";
import TalkBubble from "./TalkBubble";
import { BottomNavi, BottomNaviItem } from "./BottomNavi";
import StageItems from "./StageItems";
import { handleSelect } from "@/app/handlers/stageHandlers/stage1Handlers";
import { handleChop } from "@/app/handlers/stageHandlers/stage2Handlers";
import { handleStir } from "@/app/handlers/stageHandlers/stage3Handlers";
import { handleChocolateClick, handleChocolatePress } from "@/app/handlers/stageHandlers/stage4Handlers";
import { handleSaveDrawing } from "@/app/handlers/generalHandlers";

export default function Stage() {
  const [stage, setStage] = useState({
    main: "stage1",
    sub: "init",
  });
  const [buttonConfig, setButtonConfig] = useState({
    shape: "rectangle",
    type: null,
    message: "",
  });

  // 💝 UI 상태
  const [uiState, setUIState] = useState({
    isTalkBubbleShow: false,
    isShowButton: false,
    isShowModal: false,
    isShowItems: false,
    isShowNavi: false,
    isCompleteEvent: false,
    isDragging: false,
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

  const currentData = stageData[stage.main][stage.sub];

  // 💝 위치 관련 상태
  const [positionState, setPositionState] = useState({
    penPosition: { x: 100, y: 300 },
    currentToolPosition: { top: 90, right: 64 },
    position: { x: 100, y: 120 },
    shift: { x: 0, y: 0 },
    pastryBagPosition: { x: 54, y: 72 },
  });

  // 💝 초콜릿 정보
  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: ["rabbit", "bear", "cat", "circle", "circle", "circle"], // 6개 추가
    colors: ["ruby", "vanilla", "milk", "dark", "greentea", "red"], // 각 초콜릿의 색상 지정
    sizes: [100, 100, 100, 100, 100, 100], // 초콜릿 크기를 100%로 설정
    drawings: [],
    toppings: {}, // 토핑 저장 (초기에는 빈 객체)
  });

  // 💝 게임 진행 상태
  const [gameState, setGameState] = useState({
    currentIndex: 0,
    completedStages: [],
    stirCount: 0,
  });

  // 💝 폼 관련 정보
  const [formState, setFormState] = useState({
    inputValue: "",
    username: "",
    card: "",
  });

  // 💝 ref 관련 정보
  const hasMovedRef = useRef(new Set());
  const moldRef = useRef(null);

  const actionHandlers = {
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

    nextSubStage: () => handleNextSubStage(),
    nextMainStage: () => handleNextMainStage(),
  };

  useEffect(() => {
    const runSequence = async () => {
      await delay(1200);
      setUIState((prev) => ({
        ...prev,
        isTalkBubbleShow: true,
      }));

      const { main, sub } = stage;
      const sequence = stageData[main][sub]?.sequence;

      if (stage.main === "stage1" && stage.sub === "description") {
        setUIState((prev) => ({
          ...prev,
          isShowNavi: true,
        }));
      }

      if (sequence) {
        for (let action of sequence) {
          const handler = actionHandlers[action.type];
          if (handler) {
            await handler(action.value);
          } else {
            console.warn(`Unhandled action type: ${action.type}`);
          }
        }
      }
    };

    runSequence();
    debug("Stage Info", stage, "blue");
  }, [stage]);

  useEffect(() => {
    console.log("💝 chocolateInfo", chocolateInfo);
  }, [chocolateInfo]);

  const handleNextSubStage = () => {
    const { main, sub } = stage;
    const nextSubStage = stageData[main][sub]?.nextSubStage;

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
      currentIndex: 0,
    }));
  };

  const handleNextMainStage = () => {
    const { main } = stage;
    const currentStageData = stageData[main];

    if (!currentStageData) {
      console.error("현재 스테이지 데이터를 찾을 수 없습니다.");
      return;
    }

    setGameState((prev) => {
      const updatedStages = [...prev.completedStages, Number(main.split("stage")[1])];
      console.log("업데이트된 completedStages: ", updatedStages);
      return { ...prev, completedStages: updatedStages };
    });

    const finalSubStageKey = Object.keys(currentStageData).find((key) => currentStageData[key].isFinal === true);

    if (finalSubStageKey) {
      const nextMainStage = currentStageData[finalSubStageKey]?.nextMainStage;
      if (nextMainStage) {
        setStage({ main: nextMainStage, sub: "init" });
      } else {
        console.log("다음 메인 스테이지 없음");
      }
    } else {
      console.log("isFinal 서브스테이지를 찾을 수 없습니다.");
    }

    setUIState((prev) => ({
      ...prev,
      isTalkBubbleShow: false,
      isShowButton: false,
      isShowModal: false,
      isShowItems: false,
      isCompleteEvent: false,
    }));

    setSelectionState((prev) => ({
      ...prev,
      currentChocolateIndex: main === "stage5" ? null : 0,
      currentColor: "vanilla",
    }));

    setButtonConfig({
      shape: "rectangle",
      type: null,
      message: "",
    });

    setGameState((prev) => ({
      ...prev,
      currentIndex: 0,
    }));
  };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setIsSubmitEnabled(value.length > 0);
  // };

  const handleEvent = (type, variant, index) => {
    switch (stage.main) {
      case "stage1":
        handleSelect(variant, setChocolateInfo, setUIState);
        break;
      case "stage2":
        handleChop(gameState, setGameState, positionState, setPositionState, currentData);
        break;
      case "stage3":
        handleStir(gameState, setGameState, setUIState);
        break;
      case "stage4":
        if (type === "chocolateClick") {
          handleChocolateClick(index, selectionState, setChocolateInfo);
        } else if (type === "pressChocolate") {
          handleChocolatePress(index, selectionState, setChocolateInfo);
        }
        break;
      case "stage5":
        if (type === "saveDrawing") {
          handleSaveDrawing(variant, setChocolateInfo, index);
        }
        break;
      default:
        console.warn("Unhandled stage:", stage.main);
    }
  };

  // // 초콜릿이 100% 채워지면 다음 초콜릿으로 이동
  // useEffect(() => {
  //   if (stage.main !== "stage4") return;

  //   if (chocolateInfo.sizes[currentChocolateIndex] >= 100 && !hasMovedRef.current.has(currentChocolateIndex)) {
  //     hasMovedRef.current.add(currentChocolateIndex); // 현재 인덱스 저장 (중복 실행 방지)

  //     setTimeout(() => {
  //       if (currentChocolateIndex < chocolatePositions.length - 1) {
  //         setCurrentChocolateIndex((prev) => prev + 1);
  //       }
  //     }, 300); // 0.3초 후 이동
  //   }
  // }, [chocolateInfo.sizes, currentChocolateIndex]);

  // // 짤주머니 위치 업데이트
  // useEffect(() => {
  //   setPastryBagPosition(chocolatePositions[currentChocolateIndex]);
  // }, [currentChocolateIndex]);

  // useEffect(() => {
  //   if (chocolateInfo.sizes.every((size) => size >= 100)) {
  //     setIsCompleteEvent(true); // Next 버튼 활성화
  //     setIsPastryBagHidden(true); // 짤주머니 숨김
  //   }
  // }, [chocolateInfo.sizes]);

  // useEffect(() => {
  //   debug("current chocolate index", currentChocolateIndex);
  // }, [currentChocolateIndex]);

  // useEffect(() => {
  //   debug("current tab index", currentTabIndex);
  // }, [currentTabIndex]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!isZoomMode && moldRef.current && !moldRef.current.contains(event.target)) {
  //       setCurrentChocolateIndex(null); // 초콜릿 영역 외 클릭 시 원상복귀
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   document.addEventListener("touchstart", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  // }, [isZoomMode]);

  // useEffect(() => {
  //   const mainStage = Number(stage.main.split("stage")[1]);
  //   if (mainStage >= 3) {
  //     document.body.classList.add("block-scroll");
  //   } else {
  //     document.body.classList.remove("block-scroll");
  //   }

  //   if (mainStage === 4) {
  //     setShapes(
  //       Array(6)
  //         .fill(null)
  //         .map((_, i) => chocolateInfo.shapes[i % chocolateInfo.shapes.length]) // 순환 적용
  //     );
  //   }

  //   return () => {
  //     document.body.classList.remove("block-scroll");
  //   };
  // }, [stage.main, chocolateInfo.shapes]);

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
            onChange={handleInputChange}
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
        <StageItems currentData={currentData} stage={stage} handleEvent={handleEvent} selectionState={selectionState} positionState={positionState} />
      )}

      {/* 버튼 */}
      {uiState.isShowButton && (
        <div className="absolute right-4 top-[46%]">
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
      {uiState.isShowNavi && <Navi currentStage={extractStageNumber(stage.main)} completedStages={gameState.completedStages} />}

      {/* 하단 네비게이션 */}
      {uiState.isShowItems && Number(stage.main.split("stage")[1]) >= 4 && stage.sub === "description" && <BottomNavi stage={stage} />}
    </StageLayout>
  );
}
