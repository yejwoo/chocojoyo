import tailwindConfig from "@/tailwind.config.mjs";

export const DOMAIN = "chocojoyo.com"
export const MAX_HISTORY_LENGTH = 50;
export const SLOGAN = "나만의 초콜릿으로 달콤한 마음을 전해줘요.";
export const songPath = "/sound/song/"
export const effectPath = "/sound/effect/"
export const chocolateColors = tailwindConfig.theme.extend.colors.chocolates;
export const chocopenColors = tailwindConfig.theme.extend.colors.chocopens;
export const isTestMode = process.env.NEXT_PUBLIC_IS_TEST_MODE === "true";
export const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
export const ZOOM_SCALE = 2.2;