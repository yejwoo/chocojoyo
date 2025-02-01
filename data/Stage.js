// import { Shapes } from "@/public/icons/shapes";
import {
  yantoBlink,
  yantoHello,
  yantoEat,
  yantoSwing,
  yantoThumb,
} from "@/public/images/common";

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
  arrowDown,
} from "@/public/images/stage2";
import {
  arrow,
  doubleBoiler1,
  doubleBoiler2,
  doubleBoiler3,
  spatula,
} from "@/public/images/stage3";
import { pastryBag } from "@/public/images/stage4";

// @TODO: 얀토 이미지 수정 후 imgSrc 전면 수정
export const stageData = {
  /**
   *
   * =========================Stage 1=========================
   *
   */
  stage1: {
    init: {
      imgSrc: yantoHello,
      dialogue: `
            안녕하세요!<br/>
            저는 얀토예요.<br/>
        `,
      modalConfig: null,
      sequence: [{ type: "delay", value: 1500 }, { type: "nextSubStage" }],
      nextSubStage: "namePrompt",
      isFinal: false,
    },
    namePrompt: {
      imgSrc: yantoBlink,
      dialogue: `
          어떤 이름으로<br/>
          초콜릿을 전해드릴까요?
        `,
      sequence: [{ type: "delay", value: 1200 }, { type: "showModal" }],
      modalConfig: {
        title: "내 이름은...",
        type: "single",
        maxLength: 10,
      },
      nextSubStage: "message",
      isFinal: false,
    },
    message: {
      imgSrc: yantoThumb,
      dialogue: `
            멋진 이름이에요!<br/>
            이제 시작해볼까요?
        `,
      modalConfig: null,
      sequence: [{ type: "delay", value: 2000 }, { type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoBlink,
      dialogue: `
            초콜릿 모양을<br/>
            선택해주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage2",
      isFinal: true,
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
      dialogue: null,
      modalConfig: null,
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoBlink,
      dialogue: `
            이제 칼을 눌러서<br/>
            초콜릿을 썰어주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage3",
      isFinal: true,
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
      dialogue: null,
      modalConfig: null,
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoBlink,
      dialogue: `
            초콜릿을 저어주세요.<br/><br/>
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage4",
      isFinal: true,
    },
  },
  /**
   *
   * =========================Stage 4=========================
   *
   */
  stage4: {
    init: {
      imgSrc: yantoThumb,
      dialogue: null,
      modalConfig: null,
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoSwing,
      dialogue: `
            짤주머니를 꾹 눌러<br/>
            초콜릿을 채워주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage5",
      isFinal: true,
    },
  },
  /**
   *
   * =========================Stage 5=========================
   *
   */
  stage5: {
    init: {
      imgSrc: yantoThumb,
      dialogue: "",
      modalConfig: null,
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoSwing,
      dialogue: `
            거의 다 왔어요.<br/>
            초콜릿을 꾸며주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage6",
      isFinal: true,
    },
  },
  /**
   *
   * =========================Stage 6=========================
   *
   */
  stage6: {
    init: {
      imgSrc: yantoThumb,
      dialogue: "",
      modalConfig: null,
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
      isFinal: false,
    },
    description: {
      imgSrc: yantoSwing,
      dialogue: `
            마지막이에요.<br/>
            상자를 꾸며주세요.
        `,
      modalConfig: null,
      sequence: [
        { type: "delay", value: 1000 },
        { type: "showItems" },
        {
          type: "showButton",
          value: { shape: "circle", type: "arrow", message: null },
        },
      ],
      nextSubStage: null,
      nextMainStage: "stage7",
      isFinal: true,
    },
  },
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
      {
        imgSrc: "./icons/shapes/shape-circle.svg",
        alt: "원형 초콜릿",
        type: "select",
        variant: "circle",
      },
      {
        imgSrc: "./icons/shapes/shape-heart.svg",
        alt: "하트 초콜릿",
        type: "select",
        variant: "heart",
      },
      {
        imgSrc: "./icons/shapes/shape-square.svg",
        alt: "사각형 초콜릿",
        type: "select",
        variant: "square",
      },
      {
        imgSrc: "./icons/shapes/shape-bear.svg",
        alt: "곰 초콜릿",
        type: "select",
        variant: "bear",
      },
      {
        imgSrc: "./icons/shapes/shape-rabbit.svg",
        alt: "토끼 초콜릿",
        type: "select",
        variant: "rabbit",
      },
      {
        imgSrc: "./icons/shapes/shape-cat.svg",
        alt: "고양이 초콜릿",
        type: "select",
        variant: "cat",
      },
    ],
  },
  stage2: {
    tool: {
      off: { imgSrc: knifeUp, alt: "칼 올리기" },
      on: { imgSrc: knifeDown, alt: "칼 내리기" },
      positions: {
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
  },
  stage3: {
    tool: {
      off: { imgSrc: spatula, alt: "스패출라" },
      on: null,
      alt: "스패츌라",
      position: null,
      action: "move",
    },
    items: [
      {
        imgSrc: doubleBoiler1,
        alt: "초콜릿 중탕",
        type: "stir",
        variant: null,
      },
      {
        imgSrc: doubleBoiler2,
        alt: "초콜릿 중탕",
        type: "stir",
        variant: null,
      },
      {
        imgSrc: doubleBoiler3,
        alt: "초콜릿 중탕",
        type: "stir",
        variant: null,
      },
    ],
  }
};
