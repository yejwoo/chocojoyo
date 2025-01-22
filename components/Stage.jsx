import StageLayout from "./StageLayout";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from "@/utils/delay";
import { extractStageNumber } from "@/utils/extractStageNumber";
import { debug } from "@/utils/debug";
import { talkBubbleBodySm, talkBubbleTail, checkLg, bg} from "@/public/images/common";
import { stageData, stageItems } from "@/data/Stage";

export default function Stage() {
  const [stage, setStage] = useState({
    main: "stage1",
    sub: "init",
  });
  const [buttonConfig, setButtonConfig] = useState({
    shape: "rectangle",
    type: null,
    message: ""
  })
  // @TODO: 상태들 객체로 합치기
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toolState, setToolState] = useState("off");
  const [currentGuidePosition, setCurrentGuidePosition] = useState({
    top: `${stageItems[stage.main].guides?.positions?.offset.top}px`,
    right: `${stageItems[stage.main].guides?.positions?.offset.right}px`
  });
  const [currentToolPosition, setCurrentToolPosition] = useState({
    top: `${stageItems[stage.main].tool?.positions?.offset.top}px`,
    right: `${stageItems[stage.main].tool?.positions?.offset.right}px`
  });
  const [completedStages, setCompletedStages] = useState([]);
  const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowItems, setIsShowItems] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isCompleteEvent, setIsCompleteEvent] = useState(false);
  const currentData = stageData[stage.main][stage.sub];
  const modalConfig = currentData.modalConfig;

  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: [], 
    colors: {}, 
    drawings: {}, 
    toppings: {}, 
  });

  const [formData, setFormData] = useState({
    username: "",
    card: "",
    receiver: "",
    chocolateName: ""
  })

  const actionHandlers = {
    delay: async (value) => await delay(value),
    showButton: (value) => {
        setIsShowButton(true);
        setButtonConfig({
            shape: value.shape,
            type: value.type,
            message: value.message
        })
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

  useEffect(()=>{
    console.log("chocolateInfo", chocolateInfo);
  }, [chocolateInfo])

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

    setCompletedStages((prev) => [...new Set([...prev, main])]);
    setIsTalkBubbleShow(false);0
    setIsShowButton(false);
    setIsShowModal(false);
    setIsShowItems(false);
    setIsCompleteEvent(false)
    setCurrentIndex(0);
    setButtonConfig({
        shape: "rectangle",
        type: null,
        message: ""
    })
  };

    // @TODO: 인풋에 입력한 데이터 저장
  const handleFormData = () => {
    handleNextSubStage();
  }

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
    const currentToolOffset = stageItems[stage.main].tool.positions.offset;
    const toolStep = stageItems[stage.main].tool.positions.step;
    const currentGuidelOffset = stageItems[stage.main].guides.positions.offset;
    const guideStep = stageItems[stage.main].guides.positions.step;
  
    if (currentIndex < stageItems[stage.main].items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentToolPosition({
        top: `${currentToolOffset.top}px`,
        right: `${currentToolOffset.right + toolStep.right * (currentIndex + 1)}px`,
      });
      setCurrentGuidePosition({
        top: `${currentGuidelOffset.top}px`,
        right: `${currentGuidelOffset.right + guideStep.right * (currentIndex + 1)}px`,
      });
    } else {
      setIsCompleteEvent(true);
    }
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

  const handleToolAction = () => {
    const behavior = stageItems[stage.main].tool.action;
  
    if (behavior === "toggle") {
      toggleToolState(); // on/off 전환
    } else if (behavior === "move") {
      // 이동 로직 추가
      console.log("도구 이동!");
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
          <div className="absolute bottom-[436px] right-5 w-48">
            <Image className="" src={talkBubbleBodySm} alt="말풍선" />
            <p
              className="absolute left-4 top-1/2 -translate-y-1/2 leading-6 text-xl"
              dangerouslySetInnerHTML={{ __html: currentData.dialogue }}
            />
          </div>
          <div className="absolute bottom-[444px] right-[204px] w-7">
            <Image src={talkBubbleTail} alt="말풍선" />
          </div>
        </>
      )}
      {/* 메인 아이템 */}
      {
        isShowItems && (
            <div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex gap-6 flex-wrap animate-bounce-up-once">
            {stage.main === "stage2" || stage.main === "stage3" ? (
                <>
                    <div className="relative">
                        <div 
                        style={currentToolPosition}
                        className={`${toolState === "off" ? 'w-6' : 'w-8'} absolute`} onClick={()=>{
                            toggleToolState();
                            handleEvent(stageItems[stage.main].items[currentIndex].type, "_", currentIndex);
                        }}>
                          <Image
                            src={
                              toolState === "off"
                                ? stageItems[stage.main].tool.off.imgSrc
                                : stageItems[stage.main].tool.on.imgSrc
                            }
                            alt={
                              toolState === "off"
                                ? stageItems[stage.main].tool.off.alt
                                : stageItems[stage.main].tool.on.alt
                            }
                          />
                        </div>
                        <div className="w-80">
                            <Image
                                src={stageItems[stage.main].items[currentIndex].imgSrc}
                                alt={stageItems[stage.main].items[currentIndex].alt}
                            />
                        </div>
                    </div>
                    <div className="w-10 absolute" style={currentGuidePosition}>
                        <Image
                            src={stageItems[stage.main].guides.imgSrc}
                            alt={stageItems[stage.main].guides.alt}
                        />
                    </div>
                </>
            ) : (
                stageItems[stage.main].items.map((item, index) => (
                <div
                    onClick={()=>{
                        handleEvent(item.type, item.variant, index)
                    }}
                    className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
                    key={index}
                >
                    <Image className="" src={item.imgSrc} alt={`${item.alt}`} />
                    <Image
                    className={`${chocolateInfo.shapes.includes(item.variant) ? "" : "hidden"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                    src={checkLg}
                    alt="완료"
                    />
                </div>
                ))
            )}
            </div>
        )
      }
      {/* 버튼 */}
      {isShowButton && (
        stage.main === 'stage1' && stage.sub === 'init' ? 
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once">
          <Button onClick={handleNextSubStage} shape={buttonConfig.shape} type={buttonConfig.type} message={buttonConfig.message} />
        </div>
        : 
        <div className="absolute right-10 bottom-10">
            <Button disabled={!isCompleteEvent} onClick={handleNextMainStage} shape={buttonConfig.shape} type={buttonConfig.type} message={buttonConfig.message} />
        </div>
      )}
      {/* 상단 네비게이션 */}
      <Navi
        currentStage={extractStageNumber(stage.main)}
        completedStages={completedStages}
      />
    </StageLayout>
  );
}
