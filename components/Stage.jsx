import StageLayout from "./StageLayout";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { extractStageNumber } from "@/utils/extractStageNumber";
import { debug } from "@/utils/debug";
import { checkLg, bg } from "@/public/images/common";
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

  // // @TODO: 인풋에 입력한 데이터 저장
  // const handleFormData = () => {
  //   handleNextSubStage();
  // };

  // //   const handleCloseModal = () => {};

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setIsSubmitEnabled(value.length > 0);
  // };

  // const handleSelect = (variant) => {
  //   setChocolateInfo((prev) => {
  //     const updatedShapes = prev.shapes.includes(variant) ? prev.shapes.filter((item) => item !== variant) : [...prev.shapes, variant];

  //     setIsCompleteEvent(updatedShapes.length > 0);
  //     return { ...prev, shapes: updatedShapes };
  //   });
  // };

  // const handleChop = () => {
  //   const toolStep = stageItems[stage.main].tool.positions.step;

  //   if (currentIndex < stageItems[stage.main].items.length - 1) {
  //     setCurrentIndex((prev) => prev + 1);
  //     setCurrentToolPosition({
  //       top: currentToolPosition.top,
  //       right: currentToolPosition.right + toolStep.right,
  //     });
  //   }
  //   if (currentIndex === stageItems[stage.main].items.length - 2) setIsCompleteEvent(true);
  // };

  // const toggleToolState = () => {
  //   setToolState((prev) => (prev === "off" ? "on" : "off"));
  // };

  // const handleChocolateClick = (index) => {
  //   setChocolateInfo((prev) => {
  //     const updatedColors = [...prev.colors];

  //     // 이미 100% 채워진 초콜릿은 색상 변경 불가
  //     if (prev.sizes[index] < 100) {
  //       updatedColors[index] = currentColor;
  //     }

  //     return { ...prev, colors: updatedColors };
  //   });
  // };

  // const handleEvent = (type, variant) => {
  //   switch (type) {
  //     case "select":
  //       handleSelect(variant);
  //       break;
  //     case "chop":
  //       handleChop();
  //       break;
  //     default:
  //       console.warn("Unhandled event type:", type);
  //   }
  // };

  // /**
  //  *
  //  * 드래그 이벤트
  //  *
  //  */

  // const handleStart = (e) => {
  //   e.preventDefault();
  //   setIsDragging(true);

  //   // 이벤트 타입에 따라 좌표 가져오기
  //   const isTouchEvent = e.type === "touchstart";
  //   const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
  //   const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

  //   // 이미지와 터치/마우스의 상대적 위치 계산
  //   const img = e.target.getBoundingClientRect();
  //   setShift({
  //     x: clientX - img.left,
  //     y: clientY - img.top,
  //   });
  // };

  // const handleMove = (e) => {
  //   if (!isDragging) return;

  //   const isTouchEvent = e.type === "touchmove";
  //   const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
  //   const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
  //   const isStage4 = stage.main === "stage4";

  //   const parent = isStage4 ? document.querySelector(".pastry-bag-area")?.getBoundingClientRect() : e.target.parentElement.getBoundingClientRect();
  //   if (!parent) return;

  //   const imgWidth = isStage4 ? 114 : 100;
  //   const imgHeight = isStage4 ? 155 : 200;

  //   // 이동 가능한 범위 계산
  //   const minX = 0;
  //   const maxX = parent.width - imgWidth;
  //   const minY = 0;
  //   const maxY = parent.height - imgHeight;

  //   // 새로운 위치 계산
  //   const newX = Math.min(Math.max(clientX - parent.x - shift.x, minX), maxX);
  //   const newY = Math.min(Math.max(clientY - parent.y - shift.y, minY), maxY);

  //   setPosition({ x: newX, y: newY });
  // };

  // const handleEnd = () => {
  //   setIsDragging(false);
  //   handleStir();
  // };

  // const handleStir = () => {
  //   const nextCount = stirCount + 1;

  //   if (nextCount <= 10) {
  //     setStirCount(nextCount);
  //   }

  //   if (nextCount === 10) {
  //     setIsCompleteEvent(true);
  //   }
  // };

  // /**
  //  *
  //  * 초콜릿 짜기 이벤트
  //  *
  //  */

  // const handleChocolatePress = (index) => {
  //   if (index !== currentChocolateIndex) return; // 순서대로만 진행

  //   handleChocolateClick(index);
  //   // setIsPressing(true);

  //   const growthInterval = 100;
  //   let interval;

  //   interval = setInterval(() => {
  //     setChocolateInfo((prev) => {
  //       const updatedSizes = [...prev.sizes];
  //       if (updatedSizes[index] < 100) {
  //         updatedSizes[index] += 10;
  //       }
  //       return { ...prev, sizes: updatedSizes };
  //     });
  //   }, growthInterval);

  //   const stopGrowing = () => {
  //     clearInterval(interval);
  //     // setIsPressing(false);
  //   };

  //   window.addEventListener("mouseup", stopGrowing);
  //   window.addEventListener("touchend", stopGrowing);
  // };

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

  // const handleSaveDrawing = (imageData) => {
  //   setChocolateInfo((prev) => ({
  //     ...prev,
  //     drawings: {
  //       ...prev.drawings,
  //       [currentChocolateIndex]: imageData,
  //     },
  //   }));
  // };

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
      {uiState.isShowItems && <StageItems currentData={currentData} stage={stage} />}

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
