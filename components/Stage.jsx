import tailwindConfig from "../tailwind.config.mjs";
import StageLayout from "./StageLayout";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { extractStageNumber } from "@/utils/extractStageNumber";
import { debug } from "@/utils/debug";
import {
  talkBubbleBodySm,
  talkBubbleTail,
  checkLg,
  bg,
} from "@/public/images/common";
import { stageData, stageItems } from "@/data/Stage";
import { Shapes } from "@/public/icons/shapes";
import mold from "@/public/images/stage4/chocolate-mold.svg";
import { PastryBag } from "@/public/images/stage4";

export default function Stage() {
  const [stage, setStage] = useState({
    main: "stage4",
    sub: "init",
  });
  const [buttonConfig, setButtonConfig] = useState({
    shape: "rectangle",
    type: null,
    message: "",
  });
  // @TODO: 상태들 객체로 합치기
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toolState, setToolState] = useState("off");
  const [currentGuidePosition, setCurrentGuidePosition] = useState({
    top: 40,
    right: 60,
  });
  const [currentToolPosition, setCurrentToolPosition] = useState({
    top: 90,
    right: 64,
  });
  const [completedStages, setCompletedStages] = useState([]);
  const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowItems, setIsShowItems] = useState(false);
  const [isShowNavi, setIsShowNavi] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isCompleteEvent, setIsCompleteEvent] = useState(false);
  const currentData = stageData[stage.main][stage.sub];
  const [position, setPosition] = useState({ x: 100, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [stirCount, setStirCount] = useState(0);
  const [pastryBagPosition, setPastryBagPosition] = useState({ x: 54, y: 72 });
  const [currentChocolateIndex, setCurrentChocolateIndex] = useState(0);
  const [isPastryBagHidden, setIsPastryBagHidden] = useState(false); // 짤주머니 숨김 여부
  const hasMovedRef = useRef(new Set());
  const chocolatePositions = [
    { x: 54, y: 72 },
    { x: 144, y: 72 },
    { x: 233, y: 72 },
    { x: 54, y: 154 },
    { x: 144, y: 154 },
    { x: 233, y: 154 },
  ];

  const modalConfig = currentData.modalConfig;
  const chocolatColorsConfig = tailwindConfig.theme.extend.colors.chocolates;
  const chocolateColors = {
    default: {
      fill: "#A9A9A9",
      border: "#9E9C9D",
    },
    vanilla: {
      fill: chocolatColorsConfig.vanilla[100],
      border: chocolatColorsConfig.vanilla[200],
    },
    milk: {
      fill: chocolatColorsConfig.milk[100],
      border: chocolatColorsConfig.milk[200],
    },
    dark: {
      fill: chocolatColorsConfig.dark[100],
      border: chocolatColorsConfig.dark[200],
    },
    ruby: {
      fill: chocolatColorsConfig.ruby[100],
      border: chocolatColorsConfig.ruby[200],
    },
    red: {
      fill: chocolatColorsConfig.red[100],
      border: chocolatColorsConfig.red[200],
    },
    greentea: {
      fill: chocolatColorsConfig.greentea[100],
      border: chocolatColorsConfig.greentea[200],
    },
  };

  const [selectedColor, setSelectedColor] = useState("vanilla");
  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: ["heart"],
    colors: Array(6).fill("default"),
    sizes: Array(6).fill(0),
    drawings: {},
    toppings: {},
  });
  const [shapes, setShapes] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    card: "",
    receiver: "",
    chocolateName: "",
  });

  const actionHandlers = {
    delay: async (value) => await delay(value),
    showButton: (value) => {
      setIsShowButton(true);
      setButtonConfig({
        shape: value.shape,
        type: value.type,
        message: value.message,
      });
    },
    showModal: () => setIsShowModal(true),
    showItems: () => setIsShowItems(true),
    nextSubStage: () => handleNextSubStage(),
    nextManiStage: () => handleNextMainStage(),
  };

  useEffect(() => {
    const runSequence = async () => {
      await delay(1500);
      setIsTalkBubbleShow(true);

      const { main, sub } = stage;
      const sequence = stageData[main][sub]?.sequence;

      if (stage.main === "stage1" && stage.sub === "description")
        setIsShowNavi(true);

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
    console.log("💝chocolateInfo", chocolateInfo);
  }, [chocolateInfo]);

  useEffect(() => {
    const mainStage = Number(stage.main.split("stage")[1]);
    if (mainStage >= 3) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    if (mainStage === 4) {
      setShapes(
        Array(6)
          .fill(null)
          .map((_, i) => chocolateInfo.shapes[i % chocolateInfo.shapes.length]) // 순환 적용
      );
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [stage.main, chocolateInfo.shapes]);

  const handleNextSubStage = () => {
    const { main, sub } = stage;
    const nextSubStage = stageData[main][sub]?.nextSubStage;

    if (nextSubStage) {
      setStage((prev) => ({ ...prev, sub: nextSubStage }));
    } else {
      handleNextMainStage();
    }

    setIsTalkBubbleShow(false);
    setIsShowButton(false);
    setIsShowModal(false);
    setIsShowItems(false);
    setCurrentIndex(0);
  };

  const handleNextMainStage = () => {
    const { main } = stage;
    const currentStageData = stageData[main];

    if (!currentStageData) {
      console.error("현재 스테이지 데이터를 찾을 수 없습니다.");
      return;
    }

    setCompletedStages((prev) => {
      const updatedStages = [...prev, Number(main.split("stage")[1])];
      console.log("업데이트된 completedStages: ", updatedStages);
      return updatedStages;
    });

    const finalSubStageKey = Object.keys(currentStageData).find(
      (key) => currentStageData[key].isFinal === true
    );

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

    setIsTalkBubbleShow(false);
    setIsShowButton(false);
    setIsShowModal(false);
    setIsShowItems(false);
    setIsCompleteEvent(false);
    setCurrentIndex(0);
    setButtonConfig({
      shape: "rectangle",
      type: null,
      message: "",
    });
  };

  // @TODO: 인풋에 입력한 데이터 저장
  const handleFormData = () => {
    handleNextSubStage();
  };

  //   const handleCloseModal = () => {};

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSubmitEnabled(value.length > 0);
  };

  const handleSelect = (variant) => {
    setChocolateInfo((prev) => {
      const updatedShapes = prev.shapes.includes(variant)
        ? prev.shapes.filter((item) => item !== variant)
        : [...prev.shapes, variant];

      setIsCompleteEvent(updatedShapes.length > 0);
      return { ...prev, shapes: updatedShapes };
    });
  };

  const handleChop = () => {
    const toolStep = stageItems[stage.main].tool.positions.step;
    const guideStep = stageItems[stage.main].guides.positions.step;

    if (currentIndex < stageItems[stage.main].items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentToolPosition({
        top: currentToolPosition.top,
        right: currentToolPosition.right + toolStep.right,
      });
      setCurrentGuidePosition({
        top: currentGuidePosition.top,
        right: currentGuidePosition.right + guideStep.right,
      });
    }
    if (currentIndex === stageItems[stage.main].items.length - 2)
      setIsCompleteEvent(true);
  };

  const toggleToolState = () => {
    setToolState((prev) => (prev === "off" ? "on" : "off"));
  };

  const handleChocolateClick = (index) => {
    setChocolateInfo((prev) => {
      const updatedColors = [...prev.colors];

      // 이미 100% 채워진 초콜릿은 색상 변경 불가
      if (prev.sizes[index] < 100) {
        updatedColors[index] = selectedColor;
      }

      return { ...prev, colors: updatedColors };
    });
  };

  const handleEvent = (type, variant) => {
    switch (type) {
      case "select":
        handleSelect(variant);
        break;
      case "chop":
        handleChop();
        break;
      default:
        console.warn("Unhandled event type:", type);
    }
  };

  /**
   *
   * 드래그 이벤트
   *
   */

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    // 이벤트 타입에 따라 좌표 가져오기
    const isTouchEvent = e.type === "touchstart";
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

    // 이미지와 터치/마우스의 상대적 위치 계산
    const img = e.target.getBoundingClientRect();
    setShift({
      x: clientX - img.left,
      y: clientY - img.top,
    });
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const isTouchEvent = e.type === "touchmove";
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    const isStage4 = stage.main === "stage4";

    const parent = isStage4
      ? document.querySelector(".pastry-bag-area")?.getBoundingClientRect()
      : e.target.parentElement.getBoundingClientRect();
    if (!parent) return;

    const imgWidth = isStage4 ? 114 : 100;
    const imgHeight = isStage4 ? 155 : 200;

    // 이동 가능한 범위 계산
    const minX = 0;
    const maxX = parent.width - imgWidth;
    const minY = 0;
    const maxY = parent.height - imgHeight;

    // 새로운 위치 계산
    const newX = Math.min(Math.max(clientX - parent.x - shift.x, minX), maxX);
    const newY = Math.min(Math.max(clientY - parent.y - shift.y, minY), maxY);

    setPosition({ x: newX, y: newY });
  };

  const handleEnd = () => {
    setIsDragging(false);
    handleStir();
  };

  const handleStir = () => {
    const nextCount = stirCount + 1;

    if (nextCount <= 10) {
      setStirCount(nextCount);
    }

    if (nextCount === 10) {
      setIsCompleteEvent(true);
    }
  };

  /**
   *
   * 초콜릿 짜기 이벤트
   *
   */

  const handleChocolatePress = (index) => {
    if (index !== currentChocolateIndex) return; // 순서대로만 진행

    handleChocolateClick(index);
    // setIsPressing(true);

    const growthInterval = 100;
    let interval;

    interval = setInterval(() => {
      setChocolateInfo((prev) => {
        const updatedSizes = [...prev.sizes];
        if (updatedSizes[index] < 100) {
          updatedSizes[index] += 10;
        }
        return { ...prev, sizes: updatedSizes };
      });
    }, growthInterval);

    const stopGrowing = () => {
      clearInterval(interval);
      // setIsPressing(false);
    };

    window.addEventListener("mouseup", stopGrowing);
    window.addEventListener("touchend", stopGrowing);
  };

  // 초콜릿이 100% 채워지면 다음 초콜릿으로 이동
  useEffect(() => {
    if (
      chocolateInfo.sizes[currentChocolateIndex] >= 100 &&
      !hasMovedRef.current.has(currentChocolateIndex)
    ) {
      hasMovedRef.current.add(currentChocolateIndex); // 현재 인덱스 저장 (중복 실행 방지)

      setTimeout(() => {
        if (currentChocolateIndex < chocolatePositions.length - 1) {
          setCurrentChocolateIndex((prev) => prev + 1);
        }
      }, 300); // 0.3초 후 이동
    }
  }, [chocolateInfo.sizes, currentChocolateIndex]);

  // 짤주머니 위치 업데이트
  useEffect(() => {
    setPastryBagPosition(chocolatePositions[currentChocolateIndex]);
  }, [currentChocolateIndex]);

  useEffect(() => {
    if (chocolateInfo.sizes.every((size) => size >= 100)) {
      setIsCompleteEvent(true); // Next 버튼 활성화
      setIsPastryBagHidden(true); // 짤주머니 숨김
    }
  }, [chocolateInfo.sizes]);

  return (
    <StageLayout
      backgroundSrc={bg}
      characterSrc={currentData.imgSrc}
      modalContent={
        isShowModal && (
          <Modal
            title={modalConfig.title}
            type={modalConfig.type}
            maxLength={modalConfig.maxLength}
            value={inputValue}
            onChange={handleInputChange}
            // onClose={handleCloseModal}
          >
            <Button
              message={"작성 완료"}
              size="full"
              disabled={!isSubmitEnabled}
              onClick={handleFormData}
            />
          </Modal>
        )
      }
    >
      {/* 말풍선 */}
      {isTalkBubbleShow && (
        <>
          <div className="absolute bottom-[436px] right-3 w-48">
            <Image className="" src={talkBubbleBodySm} alt="말풍선" />
            <p
              className="absolute left-4 top-1/2 -translate-y-1/2 leading-6 text-xl"
              dangerouslySetInnerHTML={{ __html: currentData.dialogue }}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>
          <div className="absolute bottom-[444px] right-[196px] w-7">
            <Image src={talkBubbleTail} alt="말풍선" />
          </div>
          {/* 동적 대사 */}
          {isShowItems &&
            stage.main === "stage3" &&
            stage.sub === "description" && (
              <p className="leading-6 text-2xl absolute right-[134px] bottom-[450px]">
                {stirCount} / 10
              </p>
            )}
        </>
      )}
      {/* 스테이지별 메인 아이템 */}
      {isShowItems && (
        <div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex justify-center gap-6 flex-wrap animate-bounce-up-once">
          {/* Stage 1 렌더링 */}
          {stage.main === "stage1" && (
            <>
              {stageItems[stage.main].items.map((item, index) => (
                <div
                  onClick={() => {
                    handleEvent(item.type, item.variant, index);
                  }}
                  className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
                  key={index}
                >
                  <Image
                    src={item.imgSrc}
                    width={80}
                    height={80}
                    alt={item.alt}
                  />
                  <Image
                    className={`${
                      chocolateInfo.shapes.includes(item.variant)
                        ? ""
                        : "hidden"
                    } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                    src={checkLg}
                    alt="완료"
                  />
                </div>
              ))}
            </>
          )}

          {/* Stage 2 렌더링 */}
          {stage.main === "stage2" && (
            <>
              <div className="relative">
                <div className="relative w-72 h-72">
                  {stageItems[stage.main].items.map((item, i) => (
                    <Image
                      key={i}
                      className={`${
                        currentIndex === i
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      } absolute bottom-0`}
                      src={item.imgSrc}
                      alt={item.alt}
                    />
                  ))}
                </div>
                <div
                  style={{
                    top: `${currentToolPosition.top}px`,
                    right: `${currentToolPosition.right}px`,
                  }}
                  className={`${
                    toolState === "off" ? "w-6" : "w-8"
                  } absolute cursor-pointer`}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={() => {
                    toggleToolState();
                    handleEvent(
                      stageItems[stage.main].items[currentIndex].type,
                      "_",
                      currentIndex
                    );
                  }}
                >
                  <Image
                    src={stageItems[stage.main].tool[toolState].imgSrc}
                    alt={stageItems[stage.main].tool[toolState].alt}
                  />
                </div>
              </div>
              <div
                className="w-10 absolute"
                style={{
                  top: `${currentGuidePosition.top}px`,
                  right: `${currentGuidePosition.right}px`,
                }}
              >
                <Image
                  src={stageItems[stage.main].guides.imgSrc}
                  alt={stageItems[stage.main].guides.alt}
                />
              </div>
            </>
          )}

          {/* Stage 3 렌더링 */}
          {stage.main === "stage3" && (
            <>
              <div className="relative w-72 h-72">
                <Image
                  src={stageItems[stage.main].items[0].imgSrc}
                  alt={stageItems[stage.main].items[0].alt}
                  className={`absolute bottom-0 ${
                    stirCount < 5
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                />
                <Image
                  src={stageItems[stage.main].items[1].imgSrc}
                  alt={stageItems[stage.main].items[1].alt}
                  className={`absolute bottom-0 ${
                    stirCount >= 5 && stirCount < 10
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                />
                <Image
                  src={stageItems[stage.main].items[2].imgSrc}
                  alt={stageItems[stage.main].items[2].alt}
                  className={`absolute bottom-0 ${
                    stirCount >= 10
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                />
              </div>
              <div className="w-full h-96 bottom-[-20px] absolute">
                <Image
                  style={{
                    position: "absolute",
                    cursor: "grab",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    WebkitTouchCallout: "none",
                    TouchAction: "none",
                  }}
                  className="w-32 cursor-pointer"
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  src={stageItems[stage.main].tool.off.imgSrc}
                  alt={stageItems[stage.main].tool.off.alt}
                />
              </div>
            </>
          )}

          {/* Stage 4 렌더링 */}
          {stage.main === "stage4" && (
            <>
              <div className="relative w-72 h-56">
                <Image
                  src={mold}
                  alt="초콜릿 틀"
                  width={280}
                  height={280}
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  style={{
                    pointerEvents: "none",
                    WebkitTouchCallout: "none",
                    TouchAction: "none",
                  }}
                />
                {/* 초콜릿들 */}
                <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  {shapes.map((item, index) => {
                    const name = item[0].toUpperCase() + item.slice(1);
                    const ShapeComponent = Shapes[name];
                    const color = chocolateInfo.colors[index];

                    return ShapeComponent ? (
                      <div
                        key={index}
                        onClick={() => handleChocolateClick(index)}
                        onMouseDown={() => handleChocolatePress(index)}
                        onTouchStart={() => handleChocolatePress(index)}
                        onDragStart={(e) => e.preventDefault()}
                        draggable={false}
                        className="flex-shrink-0 cursor-pointer relative w-16 h-14"
                        style={{
                          pointerEvents: "none",
                          WebkitTouchCallout: "none",
                          TouchAction: "none",
                        }}
                      >
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          {/* 틀 */}
                          <ShapeComponent
                            style={{
                              pointerEvents: "none",
                              WebkitTouchCallout: "none",
                              TouchAction: "none",
                            }}
                            strokeColor={chocolateColors.default.border}
                            fillColor={chocolateColors.default.fill}
                            width={64}
                            height={56}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                          />
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          {/* 실제 초콜릿 */}
                          <ShapeComponent
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            strokeColor={chocolateColors[color].border}
                            fillColor={chocolateColors[color].fill}
                            width={
                              (64 * (chocolateInfo.sizes[index] || 0)) / 100
                            }
                            height={
                              (56 * (chocolateInfo.sizes[index] || 0)) / 100
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      console.warn(`${name} 컴포넌트 없음`) || null
                    );
                  })}
                </div>
              </div>
              <div
                className="w-[343px] h-96 bottom-[-20px] pastry-bag-area absolute"
                style={{ pointerEvents: "none" }}
              >
                <PastryBag
                  fillColor={chocolateColors[selectedColor].fill}
                  className={`${isPastryBagHidden ? "hidden" : ""}`} // 모든 초콜릿 채우면 숨김
                  style={{
                    position: "absolute",
                    cursor: "grab",
                    left: `${pastryBagPosition.x}px`,
                    top: `${pastryBagPosition.y}px`,
                    WebkitTouchCallout: "none",
                    TouchAction: "none",
                    pointerEvents: "auto",
                    userSelect: "none",
                  }}
                  onClick={() => handleChocolateClick(currentChocolateIndex)}
                  onMouseDown={() =>
                    handleChocolatePress(currentChocolateIndex)
                  }
                  onTouchStart={() =>
                    handleChocolatePress(currentChocolateIndex)
                  }
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </>
          )}

          {/* Stage 5 렌더링 */}
          {stage.main === "stage5" && (
            <div className="relative">
              {/* Stage5 관련 UI 추가 */}
              <p>Stage 5 Content</p>
            </div>
          )}

          {/* Stage 6 렌더링 */}
          {stage.main === "stage6" && (
            <div className="relative">
              {/* Stage6 관련 UI 추가 */}
              <p>Stage 6 Content</p>
            </div>
          )}
        </div>
      )}
      {/* 버튼 */}
      {isShowButton &&
        (stage.main === "stage1" && stage.sub === "init" ? (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once">
            <Button
              onClick={handleNextSubStage}
              shape={buttonConfig.shape}
              type={buttonConfig.type}
              message={buttonConfig.message}
            />
          </div>
        ) : (
          <div className="absolute right-10 bottom-20">
            <Button
              disabled={!isCompleteEvent}
              onClick={handleNextMainStage}
              shape={buttonConfig.shape}
              type={buttonConfig.type}
              message={buttonConfig.message}
            />
          </div>
        ))}
      {/* 상단 네비게이션 */}
      {isShowNavi && (
        <Navi
          currentStage={extractStageNumber(stage.main)}
          completedStages={completedStages}
        />
      )}
      {/* 하단 네비게이션 */}
      {isShowItems &&
        stage.main === "stage4" &&
        stage.sub === "description" && (
          <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0">
            <div className="flex gap-7 justify-center items-center w-full h-full">
              {Object.keys(chocolateColors)
                .filter((item) => item !== "default")
                .map((item) => (
                  <div
                    key={item}
                    onClick={() => setSelectedColor(item)}
                    className={`cursor-pointer rounded-full border-2 w-8 h-8
                  ${selectedColor === item ? "ring-4 ring-brand-200" : ""}`}
                    style={{
                      backgroundColor: chocolateColors[item].fill,
                      borderColor: chocolateColors[item].border,
                    }}
                  ></div>
                ))}
            </div>
          </div>
        )}
    </StageLayout>
  );
}
