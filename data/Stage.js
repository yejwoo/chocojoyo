import { yantoBlink, yantoHello, yantoEat, yantoSwing, yantoThumb} from "@/public/images/common";
import { shapeBear, shapeCat, shapeCircle, shapeHeart, shapeRabbit, shapeSquare} from "@/public/images/stage1";

// @TODO: 얀토 이미지 수정 후 imgSrc 전면 수정
export const stageData = {
  /**
   * 
   * =========================Stage 1=========================
   * 
   */
  stage1: {
    init: {
      imgSrc: yantoBlink,
      dialogue: `
            안녕하세요, 얀토예요!<br/>
            저와 함께 달콤한 초콜릿을<br/>
            만들어볼까요?<br/>
        `,
      sequence: [{ type: "delay", value: 1000 }, { type: "showButton" }],
      nextSubStage: "namePrompt",
    },
    namePrompt: {
      imgSrc: yantoBlink,
      dialogue: `
            좋아요! 시작하기에 앞서<br/>
            이름을 알려주세요.
        `,
      sequence: [{ type: "showModal" }],
      nextSubStage: "message",
    },
    message: {
        imgSrc: yantoBlink,
        dialogue: `
            멋진 이름이네요.<br/>
            초콜릿도 멋지게 만들어봐요!
        `,
        sequence: [{ type: "showTalkBubble" }],
        nextSubStage: "description",
    },
    description: {
        imgSrc: yantoBlink,
        dialogue: `
            초콜릿 모양을 선택해주세요.<br/>
            최소 1개 ~ 최대 6개까지<br/>
            선택 가능합니다.
        `,
        sequence: [{ type: "showTalkBubble" }],
        nextSubStage: "last",
    },
    last: {
      imgSrc: yantoBlink,
      dialogue: `
          좋았어요!<br/>
          다음 단계로 넘어가볼까요?
      `,
      sequence: [{ type: "showTalkBubble" }],
      nextSubStage: null,
      nextMainStage: "stage2"
  },
  /**
   * 
   * =========================Stage 2=========================
   * 
   */
  stage2: {
    last: {

    }
  }
    /**
   * 
   * =========================Stage 3=========================
   * 
   */
    /**
   * 
   * =========================Stage 4=========================
   * 
   */
    /**
   * 
   * =========================Stage 5=========================
   * 
   */
    /**
   * 
   * =========================Stage 6=========================
   * 
   */
    /**
   * 
   * =========================Stage 7(Share)=========================
   * 
   */
  },
};

export const stageItems = {
  stage1: [
    { imgSrc: shapeCircle, alt: "원형 초콜릿" },
    { imgSrc: shapeHeart, alt: "하트 초콜릿" },
    { imgSrc: shapeSquare, alt: "사각형 초콜릿" },
    { imgSrc: shapeBear, alt: "곰 초콜릿" },
    { imgSrc: shapeRabbit, alt: "토끼 초콜릿" },
    { imgSrc: shapeCat, alt: "고양이 초콜릿" },
  ]
}