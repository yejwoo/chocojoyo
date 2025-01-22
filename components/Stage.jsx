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
  const [currentIndex, setCurrentIndex ] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);
  const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowItems, setIsShowItems] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const currentData = stageData[stage.main][stage.sub];
  const modalConfig = currentData.modalConfig;

  const actionHandlers = {
    delay: async (value) => await delay(value),
    showButton: (value) => {
        setIsShowButton(true);
        console.log(value);
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
    const nextMainStage = stageData[main]?.last?.nextMainStage;

    if (nextMainStage) {
      setStage({ main: nextMainStage, sub: "init" });
    } else {
      console.log("공유 페이지");
    }

    setCompletedStages((prev) => [...new Set([...prev, main])]);

    setIsTalkBubbleShow(false);
    setIsShowButton(false);
    setIsShowModal(false);
    setIsShowItems(false);
    setCurrentIndex(0);
    setButtonConfig({
        shape: "rectangle",
        type: null,
        message: ""
    })
  };

//   const handleCloseModal = () => {};

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSubmitEnabled(value.length > 0);
  };

  const handleNextImage = () => {
    if (currentIndex < iterable.length - 1) {
        setCurrentIndex((prev) => prev + 1);
    } else {
        console.log("마지막 이미지");
    }
  };

  const handleEvent = (type, index) => {

  }

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
              onClick={handleNextSubStage}
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
                <div className="border border-red-500">
                <Image
                    src={iterable[currentIndex].imgSrc}
                    alt={iterable[currentIndex].alt}
                />
                <button onClick={handleNextImage}>다음</button>
                </div>
            ) : (
                stageItems[stage.main].items.map((item, index) => (
                <div
                    className="relative w-20 h-20 flex items-center justify-center"
                    key={index}
                >
                    <Image className="" src={item.imgSrc} alt={`${item.alt}`} />
                    <Image
                    className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src={checkLg}
                    alt="완료"
                    />
                </div>
                ))
            )}
            </div>
        )
      }
      {/* 버튼 타입에 따라 다른 버튼 보여주기 */}
      {/* 가운데 버튼 / 다음 버튼(활성화/비활성화) / 서브 스테이지 또는 메인 스테이지로 넘어가는 기능을 한다. */}
      {/* 버튼 */}
      {isShowButton && (
        <div className={`absolute ${stage.main === 'stage1' && stage.sub === 'init' ? "left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once" : "right-10 bottom-10"}`}>
          <Button onClick={handleNextSubStage} shape={buttonConfig.shape} type={buttonConfig.type} message={buttonConfig.message} />
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
