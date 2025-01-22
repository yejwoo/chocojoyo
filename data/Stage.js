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
    },
    message: {
      imgSrc: yantoBlink,
      dialogue: `
            멋진 이름이네요.<br/>
            초콜릿도 멋지게 만들어봐요!
        `,
      modalConfig: null,
      sequence: [{ type: "delay", value: 2000 }, { type: "nextSubStage" }],
      nextSubStage: "description",
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
        { type: "showItems" },
        { type: "showButton", value: {shape: "circle", type: "arrow", message: null}},
      ],
      nextSubStage: "last",
    },
    last: {
      imgSrc: yantoBlink,
      dialogue: `
          좋았어요!<br/>
          다음 단계로 넘어가볼까요?
      `,
      modalConfig: null,
      sequence: [{ type: "nextMainStage" }],
      nextSubStage: null,
      nextMainStage: "stage2",
    },
    /**
     *
     * =========================Stage 2=========================
     *
     */
    stage2: {
      last: {},
    },
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
  stage1: {
    tools: null,
    items: [
      { imgSrc: shapeCircle, alt: "원형 초콜릿", type: "select" },
      { imgSrc: shapeHeart, alt: "하트 초콜릿", type: "select" },
      { imgSrc: shapeSquare, alt: "사각형 초콜릿", type: "select" },
      { imgSrc: shapeBear, alt: "곰 초콜릿", type: "select" },
      { imgSrc: shapeRabbit, alt: "토끼 초콜릿", type: "select" },
      { imgSrc: shapeCat, alt: "고양이 초콜릿", type: "select" },
    ],
    guides: null,
  },
  stage2: {
    tools: [
      { on: { imgSrc: knifeDown, alt: "칼 내리기" } },
      { off: { imgSrc: knifeUp, alt: "칼 올리기" } },
    ],
    items: [
      [
        { imgSrc: chocolate1, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate2, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate3, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate4, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate5, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate6, alt: "초콜릿 썰기", type: "repeated" },
        { imgSrc: chocolate7, alt: "초콜릿 썰기", type: "repeated" },
      ],
    ],
    guides: null,
  },
  stage3: {
    tools: [{ spatula: { imgSrc: spatula, alt: "스패츌라" } }],
    items: [
      [
        { imgSrc: doubleBoiler1, alt: "초콜릿 중탕", type: "stir" },
        { imgSrc: doubleBoiler2, alt: "초콜릿 중탕", type: "stir" },
        { imgSrc: doubleBoiler3, alt: "초콜릿 중탕", type: "stir" },
      ],
    ],
    guides: [{ imgSrc: arrow, alt: "중탕 방향" }],
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
