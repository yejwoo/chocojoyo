import StageLayout from './StageLayout';
import { useEffect, useState } from "react";
import Image from "next/image"
import Button from "./Button"
import Modal from "./Modal";
import Navi from "./Navi";
import { delay } from '@/utils/delay';
import { extractStageNumber } from '@/utils/extractStageNumber';
import { talkBubbleBodySm, talkBubbleTail, bgCounterTop, checkLg, bg } from "@/public/images/common";
import { stageData } from "@/data/Stage";

export default function Stage() {
    const [stage, setStage] = useState({
        main: "stage1",  
        sub: "init",
    });    
    const [completedStages, setCompletedStages] = useState([]);
    const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowShapes, setIsShowShapes] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); 
    const currentData = stageData[stage.main][stage.sub];
    const [modalData, setModalData] = useState({ title: "", content: "" });

    const actionHandlers = {
        delay: async (value) => await delay(value),
        showButton: () => setIsShowButton(true),
        showTalkBubble: () => setIsTalkBubbleShow(true),
        showModal: () => setIsShowModal(true),
        nextStage: () => handleNextMainStage(),
    };

    useEffect(() => {
        const runSequence = async () => {
            await delay(1300);
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
        console.log("Stage updated: ", stage);
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
    };
    
    const handleNextMainStage = () => {
        const { main } = stage;
        const nextMainStage = stageData[main]?.last?.nextMainStage;
    
        if (nextMainStage) {
            setStage({ main: nextMainStage, sub: "init" });
        } else {
            console.log("모든 스테이지를 완료했습니다!"); 
        }
    
        setCompletedStages((prev) => [...new Set([...prev, main])]);
    
        setIsTalkBubbleShow(false);
        setIsShowButton(false);
        setIsShowModal(false);
    };    

    const handleShowModal = (title, content) => {
        setModalData({ title, content });
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
        setModalData({ title: "", content: "" });
    };
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsSubmitEnabled(value.length > 0);
    }

    return (
        <StageLayout 
            backgroundSrc={bg}
            characterSrc={currentData.imgSrc}
            modalContent={
                isShowModal && (
                    <Modal
                        title={modalData.title}
                        type={modalData.type}
                        value={modalData.inputValue}
                        maxLength={modalData.maxLength}
                        onChange={handleInputChange}
                        onClose={handleCloseModal}    
                    >
                        <Button message={"작성 완료"} size="full" disabled={!isSubmitEnabled} onClick={handleNextSubStage} />
                    </Modal>
                )
            }
        >
            {isTalkBubbleShow && (
                <>
                    <div className="absolute bottom-[436px] right-5 w-48">
                        <Image className="" src={talkBubbleBodySm} alt="말풍선" />            
                        <p className="absolute left-4 top-1/2 -translate-y-1/2 leading-6 text-xl" 
                           dangerouslySetInnerHTML={{ __html: currentData.dialogue }} 
                        /> 
                    </div>
                    <div className="absolute bottom-[444px] right-[204px] w-7">
                        <Image src={talkBubbleTail} alt="말풍선" />            
                    </div>
                </>
            )}
            {/* {
                isShowShapes &&
                <div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex gap-6 flex-wrap animate-bounce-up-once">
                    {
                        stage1Shapes.map((item, index) => {
                            return (
                                <div className="relative w-20 h-20 flex items-center justify-center" key={index}>
                                    <Image className="" src={item.imgSrc} alt={`${item.alt}`} />
                                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkLg} alt="완료" />
                                </div>
                            )
                        })
                    }
                </div>
            } */}
            {
                isShowButton &&  (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once">
                    <Button onClick={handleNextSubStage} message="좋아요!" />
                </div>
            )}
            <Navi currentStage={extractStageNumber(stage.main)} completedStages={completedStages} />
        </StageLayout>
    );
}
