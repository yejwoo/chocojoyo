import Image from "next/image"
import Button from "./Button"
import Modal from "./Modal";
import Navi from "./Navi";
import { useEffect, useState } from "react";
import { delay } from "@/utils/delay";
import { talkBubbleBodySm, talkBubbleTail, bgCounterTop, checkLg } from "@/public/images/common";
import { stageData } from "@/data/Stage";
import { stage1Shapes } from "@/data/Stage";

export default function Stage1() {
    const [currentStage, setCurrentStage] = useState("intro"); 
    const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowShapes, setIsShowShapes] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); 

    useEffect(() => {
        const runSequence = async () => {
            await delay(1300);
            setIsTalkBubbleShow(true);
            await delay(1300);
            if (currentStage === 'intro') setIsShowButton(true);
            if (currentStage === 'name1') setIsShowModal(true);
            if (currentStage === 'name2') {
                await delay(3000);
                handleNextStage();
            }
            if (currentStage === 'desc') {
                setIsShowShapes(true);
            }
        }
        runSequence();
        console.log('@@@@@currentStage: ', currentStage);
      }, [currentStage]);

     
    const handleNextStage = () => {
        const nextStage = stageData[currentStage].nextStage;
        if (nextStage) {
            setCurrentStage(nextStage); 
            setIsTalkBubbleShow(false); 
            setIsShowButton(false); 
            setIsShowModal(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsSubmitEnabled(value.length > 0);
    }

    const currentData = stageData[currentStage];

    return (
        <main className="bg-white max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full">
                {/* 배경 */}
                <Image src="/images/common/background.png" fill objectFit="cover" alt="배경" />
                {/* 캐릭터 */}
                <div className="absolute bottom-[370px] xs:bottom-[390px] w-40 h-40">
                    <Image src={currentData.imgSrc} alt="얀토" />
                </div>
                {/* 카운터 */}
                <Image className="absolute bottom-0 left-1/2 -translate-x-1/2" src={bgCounterTop}  alt="카운터" />            
                {
                    isTalkBubbleShow && (
                        <>
                            <div className="absolute bottom-[436px] right-5 w-48">
                                <Image className="" src={talkBubbleBodySm}  alt="말풍선" />            
                                <p className="absolute left-4 top-1/2 -translate-y-1/2 leading-6 text-xl" dangerouslySetInnerHTML={{ __html: currentData.dialogue }}/> 
                            </div>
                            <div className="absolute bottom-[444px] right-[204px] w-7">
                                <Image src={talkBubbleTail} alt="말풍선" />            
                            </div>
                        </>
                    )
                }
                {
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
                }
               {
                  isShowButton &&  (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once">
                        <Button onClick={handleNextStage} message="좋아요!" />
                    </div>
                )}
                <Navi />
            </div>
            {
                isShowModal &&
                <Modal type="single" title="이름" value={inputValue} maxLength={10} onChange={handleInputChange}>
                    <Button message={"작성 완료"} size="full" disabled={!isSubmitEnabled} onClick={handleNextStage} />
                </Modal>
            }
        </main>
    )
} 