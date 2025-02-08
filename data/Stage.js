import { chocoepnIcons, pastryBagIcons } from "@/public/images/common/bottom-navi";
import { yantoGif } from "@/public/images/common/yanto";
import { chocolate1, chocolate2, chocolate3, chocolate4, chocolate5, chocolate6, chocolate7, chocolate8, knife } from "@/public/images/stage2";
import { doubleBoiler, meltedChocolate1, meltedChocolate2, meltedChocolate3, spatula } from "@/public/images/stage3";
import { toppingAlmond, toppingBlueberries, toppingCoffeeBean, toppingHeart, toppingSprinkle, toppingStrawberry } from "@/public/images/stage5";

const commonConfig = {
  sequence: [{ type: "delay", value: 1000 }, { type: "showItems" }],
  isFinal: true,
};

export const stageData = [
  null,
  {
    init: {
      imgSrc: yantoGif.hello,
      dialogue: "안녕하세요!<br/>얀토라고 해요.",
      sequence: [{ type: "delay", value: 1500 }, { type: "nextSubStage" }],
      nextSubStage: "message",
    },
    message: {
      imgSrc: yantoGif.thumb,
      dialogue: "여러분의 초콜릿을<br/>함께 만들러 왔어요!",
      sequence: [{ type: "delay", value: 1500 }, { type: "nextSubStage" }],
      nextSubStage: "task",
    },
    task: {
      imgSrc: yantoGif.blink,
      dialogue: "먼저, 초콜릿 모양을<br/>선택해볼까요?",
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
      imgSrc: yantoGif.thumb,
      dialogue: "우와, 멋진 모양이에요!<br/>",
      sequence: [{ type: "delay", value: 1200 }, { type: "nextSubStage" }],
      nextSubStage: "task",
    },
    task: {
      imgSrc: yantoGif.blink,
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
      imgSrc: yantoGif.thumb,
      dialogue: "칼 솜씨가<br/>제법인데요?",
      sequence: [{ type: "delay", value: 1200 }, { type: "nextSubStage" }],
      nextSubStage: "task",
    },
    task: {
      imgSrc: yantoGif.blink,
      dialogue: "초콜릿을 부드럽게<br/>녹여주세요.",
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
      imgSrc: yantoGif.clap,
      dialogue: "우와~ 정말<br/>금손이시네요!",
      sequence: [{ type: "delay", value: 1200 }, { type: "nextSubStage" }],
      nextSubStage: "task",
    },
    task: {
      imgSrc: yantoGif.swing,
      dialogue: "색을 골라 짤주머니로<br/>초콜릿을 채워주세요.",
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
      imgSrc: yantoGif.shy,
      dialogue: "이제 거의 다 됐어요!",
      sequence: [{ type: "delay", value: 1200 }, { type: "nextSubStage" }],
      nextSubStage: "task",
    },
    task: {
      imgSrc: yantoGif.swing,
      dialogue: "초콜릿을 마음껏<br/>꾸며보세요!",
      ...commonConfig,
    },
  },
  {
    init: {
      imgSrc: yantoGif.swing,
      dialogue: `마지막 단계예요!<br/>편지를 써볼까요?`,
      ...commonConfig,
    },
  },
];

export const bottomNaviConfig = {
  4: [
    {
      type: "color",
      data: pastryBagIcons,
      title: null,
    },
  ],
  5: [
    {
      type: "color",
      data: chocoepnIcons,
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
