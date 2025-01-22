import {
  yantoBlink,
  yantoHello,
  yantoEat,
  yantoSwing,
  yantoThumb,
} from "@/public/images/common";
import {
  shapeBear,
  shapeCat,
  shapeCircle,
  shapeHeart,
  shapeRabbit,
  shapeSquare,
} from "@/public/images/stage1";
import {
  chocolate1,
  chocolate2,
  chocolate3,
  chocolate4,
  chocolate5,
  chocolate6,
  chocolate7,
  knifeDown,
  knifeUp,
  arrowDown
} from "@/public/images/stage2";
import {
  arrow,
  doubleBoiler1,
  doubleBoiler2,
  doubleBoiler3,
  spatula,
} from "@/public/images/stage3";

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
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        {
          type: "showButton",
          value: { shape: "rectangle", type: null, message: "좋아요!" },
        },
      ],
      nextSubStage: "namePrompt",
      isFinal: false
    },
    namePrompt: {
      imgSrc: yantoThumb,
      dialogue: `
            좋아요! 시작하기에 앞서<br/>
            이름을 알려주세요.
        `,
      sequence: [{ type: "delay", value: 1000 }, { type: "showModal" }],
      modalConfig: {
        title: "이름 입력",
        type: "single",
        maxLength: 10,
      },
      nextSubStage: "message",
      isFinal: false
    },
    message: {
      imgSrc: yantoBlink,
      dialogue: `
            _____님,<br/>
            멋진 이름이네요.<br/>
            초콜릿도 멋지게 만들어봐요!
        `,
      modalConfig: null,
      sequence: [{ type: "delay", value: 2000 }, { type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false
    },
    description: {
      imgSrc: yantoBlink,
      dialogue: `
            초콜릿 모양을 선택해주세요.<br/>
            최소 1개 ~ 최대 6개까지<br/>
            선택 가능합니다.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" }, 
        { type: "showButton", value: {shape: "circle", type: "arrow", message: null}},
      ],
      nextSubStage: null,
      nextMainStage: "stage2",
      isFinal: true
    },
  },
  /**
     *
     * =========================Stage 2=========================
     *
     */
  stage2: {
    init: {
      imgSrc: yantoThumb,
      dialogue: `
            _____님의 선택, <br/>
            센스 만점인데요?
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 2000 }, { type: "nextSubStage" }
      ],
      nextSubStage: "description",
      isFinal: false
    },
    description: {
      imgSrc: yantoSwing,
      dialogue: `
            이제 칼을 터치해서<br/>
            초콜릿을 썰어주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" }, 
        { type: "showButton", value: {shape: "circle", type: "arrow", message: null}},
      ],
      nextSubStage: null,
      nextMainStage: "stage3",
      isFinal: true
    },
  },
  /**
   *
   * =========================Stage 3=========================
   *
   */
  stage3: {
    init: {
      imgSrc: yantoThumb,
      dialogue: `
            현란한 칼 솜씨, 대단해요!<br/>
            국자를 휘저어서<br/>
            초콜릿을 녹여주세요.
        `,
      modalConfig: null,
      sequence: [
        // { type: "delay", value: 2000 }, { type: "nextSubStage" }
      ],
      nextSubStage: "description",
      isFinal: false
    },
  },
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
};

export const stageItems = {
  stage1: {
    tool: null,
    items: [
      { imgSrc: shapeCircle, alt: "원형 초콜릿", type: "select", variant: "circle" },
      { imgSrc: shapeHeart, alt: "하트 초콜릿", type: "select", variant: "heart" },
      { imgSrc: shapeSquare, alt: "사각형 초콜릿", type: "select", variant: "square" },
      { imgSrc: shapeBear, alt: "곰 초콜릿", type: "select", variant: "bear" },
      { imgSrc: shapeRabbit, alt: "토끼 초콜릿", type: "select", variant: "rabbit" },
      { imgSrc: shapeCat, alt: "고양이 초콜릿", type: "select", variant: "cat" },
    ],
    guides: null,
  },
  stage2: {
    tool: {
       off: { imgSrc: knifeUp, alt: "칼 올리기" },
       on: { imgSrc: knifeDown, alt: "칼 내리기" },
       positions: {
         offset: { right: 80, top: 0 },
         step: { right: 20, top: 0 },
       },
       action: "toggle",
    },
    items: [
        { imgSrc: chocolate1, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate2, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate3, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate4, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate5, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate6, alt: "초콜릿 썰기", type: "chop", variant: null },
        { imgSrc: chocolate7, alt: "초콜릿 썰기", type: "chop", variant: null },
    ],
    guides: {
      imgSrc: arrowDown,
      alt: "칼질 방향",
      positions: {
        offset: { right: 46, top: -44 },
        step: { right: 20 },
      }
    },
  },
  stage3: {
    tool: {
      imgSrc: spatula,
      alt: "스패츌라",
      position: "absolute right-[20px] top-[50px]",
      action: "move" 
    },
    items: [
      [
        { imgSrc: doubleBoiler1, alt: "초콜릿 중탕", type: "stir", variant: null },
        { imgSrc: doubleBoiler2, alt: "초콜릿 중탕", type: "stir", variant: null },
        { imgSrc: doubleBoiler3, alt: "초콜릿 중탕", type: "stir", variant: null },
      ],
    ],
    guides: { imgSrc: arrow, alt: "중탕 방향" },
  },
  // stage4: {
  //   tools: [
  //     {chocolateDark : {imgSrc: chocolateDark, alt: "다크 초콜릿" }},
  //     {chocolateRuby : {imgSrc: chocolateRuby, alt: "루비 초콜릿" }},
  //     {chocolateMilk : {imgSrc: chocolateMilk, alt: "밀크 초콜릿" }},
  //     {chocolateRed : {imgSrc: chocolateRed, alt: "레드 초콜릿" }},
  //     {chocolateGreenTea : {imgSrc: chocolateGreenTea, alt: "녹차 초콜릿" }},
  //     {chocolateVanilla : {imgSrc: chocolateVanilla, alt: "바닐라 초콜릿" }},
  //   ],
  //   items: [
  //     [
  //       { imgSrc: bearDark, alt: "초콜릿 중탕" },
  //       { imgSrc: bearDefault, alt: "초콜릿 중탕" },
  //       { imgSrc: bearGreenTea, alt: "초콜릿 중탕" },
  //       { imgSrc: bearGreenTea, alt: "초콜릿 중탕" },
  //       { imgSrc: bearGreenTea, alt: "초콜릿 중탕" },
  //       { imgSrc: bearGreenTea, alt: "초콜릿 중탕" },
  //     ]
  //   ],
  //   guides: [{ imgSrc: arrow, alt: "초콜릿 중탕" },]
  // },
};
