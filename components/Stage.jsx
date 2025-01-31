import StageLayout from "./StageLayout";
import React, { useEffect, useState } from "react";
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
import Mold from "@/public/images/stage4/chocolate-mold.svg";
import { Shapes } from "@/public/icons/shapes";

export default function Stage() {
  const [stage, setStage] = useState({
    main: "stage3",
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
  const modalConfig = currentData.modalConfig;
  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: ["heart", "circle"],
    colors: {},
    drawings: {},
    toppings: {},
  });
  const [shapes, setShapes] = useState([])

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
    if (stage.main === "stage3") {
      document.body.classList.add("stage3");
    } else {
      document.body.classList.remove("stage3");
    }
  
    if (stage.main === "stage4") {
      setShapes(
        Array(6) 
          .fill(null)
          .map((_, i) => chocolateInfo.shapes[i % chocolateInfo.shapes.length]) // 순환 적용
      );
      
    }
  
    return () => {
      document.body.classList.remove("stage3");
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
    setIsDragging(true); // 드래그 시작

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

    const parent = e.target.parentElement.getBoundingClientRect();
    const imgWidth = 100;
    const imgHeight = 200;

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
                    ouchAction: "none",
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
            <div className="relative w-72 h-56">
              <Image
                src={Mold}
                alt="초콜릿 틀"
                width={280}
                height={280}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
              />
              {/* 초콜릿들 */}
              <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {shapes.map((item, index) => {
                  const shapeCount = chocolateInfo.shapes.length;
                  const name = item[0].toUpperCase() + item.slice(1); 
                  const ShapeComponent = Shapes[name]; 

                  return ShapeComponent ? (
                    <ShapeComponent
                      key={index}
                      strokeColor="#9E9C9D"
                      fillColor="#A9A9A9"
                      width={64}
                      height={56}
                    />
                  ) : (console.warn(`❌ '${name}'에 해당하는 Shape 컴포넌트가 없음.`) || null
                  );
                })}
                {/* <Shapes.Bear strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} />
                <Shapes.Cat strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} />
                <Shapes.Square strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} />
                <Shapes.Circle strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} />
                <Shapes.Heart strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} />
                <Shapes.Rabbit strokeColor="#9E9C9D" fillColor="#A9A9A9" width={64} height={56} /> */}
              </div>
            </div>
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
          <div className="absolute right-10 bottom-14">
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
    </StageLayout>
  );
}
