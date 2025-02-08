import tailwindConfig from "@/tailwind.config.mjs";

export const DOMAIN = "chocojoyo.com"
export const MAX_HISTORY_LENGTH = 50;
export const chocolateColors = tailwindConfig.theme.extend.colors.chocolates;
export const chocopenColors = tailwindConfig.theme.extend.colors.chocopens;
export const isTestMode = true;