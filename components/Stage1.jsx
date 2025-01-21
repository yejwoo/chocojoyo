import Image from "next/image"
import Button from "./Button"
import Modal from "./Modal";
import Navi from "./Navi";
import { useEffect, useState } from "react";
import { delay } from "@/utils/delay";

export default function Stage1() {
    //  const [isStarted, setIsStarted] = useState(false);
    const [currentStage, setCurrentStage] = useState("intro"); 
    const [isTalkBubbleShow, setIsTalkBubbleShow] = useState(false);
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); 

    useEffect(() => {
        const runSequence = async () => {
            await delay(1500);
            setIsTalkBubbleShow(true);
            await delay(1500);
            if (currentStage === 'intro') setIsShowButton(true);
            if (currentStage === 'name1') setIsShowModal(true);
        }
        runSequence();
        console.log('@@@@@currentStage: ', currentStage);
      }, [currentStage]);

      const stageData = {
        intro: {
            imgSrc: "/images/common/yanto-hello.gif",
            dialogue: `
                안녕하세요, 얀토예요!<br/>
                저와 함께 달콤한 초콜릿을<br/>
                만들어볼까요?<br/>
            `,
            nextStage: "name1",
        },
        name1: {
            imgSrc: "/images/common/yanto-thumb.gif",
            dialogue: `
                좋아요! 시작하기에 앞서<br/>
                이름을 알려주세요.
            `,
            nextStage: "name2",
        },
        name2: {
            imgSrc: "/images/common/yanto-thumb.gif",
            dialogue: `
                멋진 이름이네요.<br/>
                그 이름으로 초콜릿을<br/>
                전달할 거예요.
            `,
            nextStage: "desc",
        },
        desc: {
            imgSrc: "/images/common/yanto-thumb.gif",
            dialogue: `
                초콜릿 모양을 선택해주세요.<br/>
                최소 1개 ~ 최대 6개까지 선택 가능합니다.
            `,
            nextStage: null,
        },
    };

    const handleNextStage = () => {
        const nextStage = stageData[currentStage].nextStage;
        if (nextStage) {
            setCurrentStage(nextStage); 
            setIsTalkBubbleShow(false); 
            setIsShowButton(false); 
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsSubmitEnabled(value.length > 0);
    }


    const chocolates = [
        {
            name: "circle",
            alt: "원형 초콜릿"
        },
        {
            name: "heart",
            alt: "하트 초콜릿"
        },
        {
            name: "square",
            alt: "사각형 초콜릿"
        },
        {
            name: "bear",
            alt: "곰 초콜릿"
        },
        {
            name: "rabbit",
            alt: "토끼 초콜릿"
        },
        {
            name: "cat",
            alt: "고양이 초콜릿"
        },
    ]

    const currentData = stageData[currentStage];

    return (
        <main className="bg-white xs:border xs:border-default max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full">
                {/* 배경 */}
                <Image src="/images/common/background.png" fill objectFit="cover" alt="배경" />
                {/* 캐릭터 */}
                <Image className="absolute bottom-[330px] xs:bottom-[350px]" src={currentData.imgSrc} width={160} height={160} alt="얀토" />
                {/* 카운터 */}
                <Image className="absolute bottom-0 left-1/2 -translate-x-1/2" src="/images/common/bg-countertop.png" width={"400"} height={"400"}  alt="카운터" />            
                {
                    isTalkBubbleShow && (
                        <>
                            <div className="absolute bottom-[436px] right-8">
                                <Image className="" src="/images/common/talk-bubble-body-sm.png" width={"180"} height={"180"} alt="말풍선" />            
                                <p className="absolute left-4 top-1/2 -translate-y-1/2 leading-5 text-lg" dangerouslySetInnerHTML={{ __html: currentData.dialogue }}/> 
                            </div>
                            <Image className="absolute bottom-[444px] right-[204px]" src="/images/common/talk-bubble-tail.png" width={"28"} height={"28"} alt="말풍선" />            
                        </>
                    )
                }
                {/* <div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex gap-6 flex-wrap">
                    {
                        chocolates.map((item, index) => {
                            return (
                                <div className="relative w-20 h-20 flex items-center justify-center" key={index}>
                                    <Image className="" src={`/images/stage1/shape-${item.name}.png`} width={"72"} height={"72"} alt={`${item.alt}`} />
                                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="/images/common/check-lg.png" width={"72"} height={"72"} alt="완료" />
                                </div>
                            )
                        })
                    }
                </div> */}
               {
                // currentData.nextStage &&
                  isShowButton &&  (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[25%] animate-bounce-up-once">
                        <Button onClick={handleNextStage} message="좋아요!" />
                    </div>
                )}
                <Navi />
            </div>
            {
                isShowModal &&
                // 1. 작성중인 이름 state에 저장
                // 2. 글자 수 세서 모달 컴포넌트에 전송
                // 3. 글자수 1일 때부터 작성 완료 활성화시키기
                <Modal type="single" title="이름" value={inputValue} onChange={handleInputChange}>
                    <Button message={"작성 완료"} size="full" disabled={!isSubmitEnabled}/>
                </Modal>
            }
        </main>
    )
} 