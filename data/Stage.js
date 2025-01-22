import { yantoBlink, yantoHello, yantoEat, yantoSwing, yantoThumb } from "@/public/images/common";
import { shapeBear, shapeCat, shapeCircle, shapeHeart, shapeRabbit, shapeSquare } from "@/public/images/stage1";

export const stageData = {
    intro: {
        imgSrc: yantoBlink,
        dialogue: `
            안녕하세요, 얀토예요!<br/>
            저와 함께 달콤한 초콜릿을<br/>
            만들어볼까요?<br/>
        `,
        nextStage: "name1",
    },
    name1: {
        imgSrc: yantoBlink,
        dialogue: `
            좋아요! 시작하기에 앞서<br/>
            이름을 알려주세요.
        `,
        nextStage: "name2",
    },
    name2: {
        imgSrc: yantoBlink,
        dialogue: `
            input Value님,<br/>
            멋진 이름이네요.<br/>
            초콜릿도 멋지게 만들어봐요!
        `,
        nextStage: "desc",
    },
    desc: {
        imgSrc: yantoBlink,
        dialogue: `
            초콜릿 모양을 선택해주세요.<br/>
            최소 1개 ~ 최대 6개까지<br/>
            선택 가능합니다.
        `,
        nextStage: null,
    },
};

export const stage1Shapes = [
    { imgSrc: shapeCircle, alt: "원형 초콜릿"},
    { imgSrc: shapeHeart, alt: "하트 초콜릿"},
    { imgSrc: shapeSquare, alt: "사각형 초콜릿"},
    { imgSrc: shapeBear, alt: "곰 초콜릿"},
    { imgSrc: shapeRabbit, alt: "토끼 초콜릿"},
    { imgSrc: shapeCat, alt: "고양이 초콜릿"},
]