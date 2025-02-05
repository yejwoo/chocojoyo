import tailwindConfig from "../tailwind.config.mjs";
import { yantoBlink, yantoHello, yantoEat, yantoSwing, yantoThumb } from "@/public/images/common";
import { chocolate1, chocolate2, chocolate3, chocolate4, chocolate5, chocolate6, chocolate7, chocolate8, knife } from "@/public/images/stage2";
import { doubleBoiler, meltedChocolate1, meltedChocolate2, meltedChocolate3, spatula } from "@/public/images/stage3";
import { toppingAlmond, toppingBlueberries, toppingCoffeeBean, toppingHeart, toppingSprinkle, toppingStrawberry } from "@/public/images/stage5";
const chocolateColorsConfig = tailwindConfig.theme.extend.colors.chocolates;
const chocopenColorsConfig = tailwindConfig.theme.extend.colors.chocopens;

const commonConfig = {
  sequence: [
    { type: "delay", value: 1000 },
    { type: "showItems" },
    {
      type: "showButton",
      value: { shape: "circle", type: "arrow", message: null, color: "secondary" },
    },
  ],
  isFinal: true,
};

const createColorConfig = (colors) => {
  return Object.keys(colors).reduce((acc, key) => {
    acc[key] = { fill: colors[key][100], border: colors[key][200] };
    return acc;
  }, {});
};

export const stageData = [
  null,
  {
    init: {
      imgSrc: yantoHello,
      dialogue: "안녕하세요!<br/> 저는 얀토예요.",
      // { type: "delay", value: 1500 },
      sequence: [{ type: "nextSubStage" }],
      nextSubStage: "description",
    },
    // message: {
    //   imgSrc: yantoThumb,
    //   dialogue: "달콤한 초콜릿을<br/> 만들러 가볼까요?",
    //   sequence: [{ type: "delay", value: 2000 }, { type: "nextSubStage" }],
    //   nextSubStage: "description",
    // },
    description: {
      imgSrc: yantoBlink,
      dialogue: "초콜릿 모양을<br/>선택해주세요.",
      ...commonConfig,
      items: [
        {
          imgKey: "Circle",
          alt: "원형 초콜릿",
          variant: "circle",
        },
        {
          imgKey: "Heart",
          alt: "하트 초콜릿",
          variant: "heart",
        },
        {
          imgKey: "Square",
          alt: "사각형 초콜릿",
          variant: "square",
        },
        {
          imgKey: "Bear",
          alt: "곰 초콜릿",
          variant: "bear",
        },
        {
          imgKey: "Rabbit",
          alt: "토끼 초콜릿",
          variant: "rabbit",
        },
        {
          imgKey: "Cat",
          alt: "고양이 초콜릿",
          variant: "cat",
        },
      ],
    },
  },
  {
    init: {
      imgSrc: yantoBlink,
      dialogue: "이제 칼을 눌러서<br/> 초콜릿을 썰어주세요.",
      ...commonConfig,
      items: [
        { imgSrc: knife, alt: "칼", variant: null, position: { x: 180, y: 40 } },
        { imgSrc: chocolate1, alt: "초콜릿 썰기", variant: null, position: { x: 135, y: 40 } },
        { imgSrc: chocolate2, alt: "초콜릿 썰기", variant: null, position: { x: 90, y: 40 } },
        { imgSrc: chocolate3, alt: "초콜릿 썰기", variant: null, position: { x: 64, y: 40 } },
        { imgSrc: chocolate4, alt: "초콜릿 썰기", variant: null, position: { x: 120, y: 40 } },
        { imgSrc: chocolate5, alt: "초콜릿 썰기", variant: null, position: { x: 120, y: 40 } },
        { imgSrc: chocolate6, alt: "초콜릿 썰기", variant: null, position: { x: 120, y: 40 } },
        { imgSrc: chocolate7, alt: "초콜릿 썰기", variant: null, position: { x: 120, y: 40 } },
        { imgSrc: chocolate8, alt: "초콜릿 썰기", variant: null, position: { x: 120, y: 40 } },
      ],
    },
  },
  {
    init: {
      imgSrc: yantoBlink,
      dialogue: "초콜릿을 저어주세요.",
      ...commonConfig,
      items: [
        {
          imgSrc: spatula,
          alt: "스패츌라",
          variant: null,
          position: { x: 80, y: 24 },
        },
        {
          imgSrc: doubleBoiler,
          alt: "중탕 냄비",
          variant: null,
        },
        {
          imgSrc: meltedChocolate1,
          alt: "초콜릿 중탕",
          variant: null,
        },
        {
          imgSrc: meltedChocolate2,
          alt: "초콜릿 중탕",
          variant: null,
        },
        {
          imgSrc: meltedChocolate3,
          alt: "초콜릿 중탕",
          variant: null,
        },
      ],
    },
  },
  {
    init: {
      imgSrc: yantoSwing,
      dialogue: "짤주머니를 꾹 눌러<br/>초콜릿을 채워주세요.",
      items: [
        {
          position: { x: 24, y: 12 },
        },
        {
          position: { x: 110, y: 12 },
        },
        {
          position: { x: 196, y: 12 },
        },
        {
          position: { x: 24, y: 92 },
        },
        {
          position: { x: 110, y: 92 },
        },
        {
          position: { x: 196, y: 92 },
        },
      ],
      ...commonConfig,
    },
  },
  {
    init: {
      imgSrc: yantoSwing,
      dialogue: "거의 다 왔어요. 초콜릿을 꾸며주세요.",
      ...commonConfig,
    },
  },
  {
    init: {
      imgSrc: yantoSwing,
      dialogue: `마지막이에요!<br/>편지를 써주세요.`,
      ...commonConfig,
    },
  },
];

export const bottomNaviConfig = {
  4: [
    {
      type: "color",
      data: createColorConfig(chocolateColorsConfig),
      title: null,
    },
  ],
  5: [
    {
      type: "color",
      data: createColorConfig(chocopenColorsConfig),
      title: "초코펜",
    },
    {
      type: "image",
      data: [
        {
          imgSrc: toppingSprinkle,
          name: "sprinkle",
          alt: "스프링클 토핑",
        },
        {
          imgSrc: toppingHeart,
          name: "heart",
          alt: "하트 토핑",
        },

        {
          imgSrc: toppingCoffeeBean,
          name: "coffeebean",
          alt: "커피콩 토핑",
        },
        {
          imgSrc: toppingAlmond,
          name: "almond",
          alt: "아몬드 토핑",
        },
        {
          imgSrc: toppingBlueberries,
          name: "blueberries",
          alt: "블루베리 토핑",
        },
        {
          imgSrc: toppingStrawberry,
          name: "strawberry",
          alt: "딸기 토핑",
        },
      ],
      title: "토핑",
    },
  ],
  6: [
    {
      type: "image",
      title: "박스",
      data: [
        {
          imgSrc: toppingSprinkle,
          name: "sprinkle",
          alt: "스프링클 토핑",
        },
        {
          imgSrc: toppingHeart,
          name: "heart",
          alt: "하트 토핑",
        },
      ],
    },
  ],
};
