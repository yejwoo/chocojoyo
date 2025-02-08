import tailwindConfig from "@/tailwind.config.mjs";

export const DOMAIN = "chocojoyo.com"
export const MAX_HISTORY_LENGTH = 50;
export const SLOGAN = "나만의 초콜릿으로 달콤한 마음을 전해줘요";
export const chocolateColors = tailwindConfig.theme.extend.colors.chocolates;
export const chocopenColors = tailwindConfig.theme.extend.colors.chocopens;
export const isTestMode = false;