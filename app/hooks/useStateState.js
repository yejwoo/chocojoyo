import { useState, useRef } from "react";
import { stageData } from "@/data/Stage";
import { isTestMode } from "@/utils/constants";

export function useStageState() {
  // 💝 현재 스테이지 상태
  const [stage, setStage] = useState({ main: 1, sub: "init" });

  // 현재 스테이지 데이터
  const currentData = stageData[stage.main][stage.sub];

  // 💝 UI 상태
  const [uiState, setUIState] = useState({
    isTalkBubbleShow: false,
    isShowModal: false,
    isShowItems: false,
    isShowNavi: false,
    isCompleteEvent: false,
    isDragging: false,
    isRotating: false,
    isPastryBagHidden: false,
    isZoomMode: false,
    isResetPopupOpen: false,
    isClearCanvas: false,
    isOnboarding: false,
    isResetBtnClicked: false,
    isCardLoading: false,
    isClicked: false,
  });

  // 💝 현재 선택 관련 상태
  const [selectionState, setSelectionState] = useState({
    currentChocolateIndex: 0,
    currentTabIndex: 0,
    currentColor: "milk",
    currentTopping: "sprinkle",
  });

  // 💝 툴 관련 상태
  const [toolState, setToolState] = useState({
    position: { x: 0, y: 0 },
    size: 1,
    rotation: 0,
  });

  // 💝 초콜릿 정보
  const [chocolateInfo, setChocolateInfo] = useState({
    shapes: isTestMode ? Array(6).fill("heart") : [],
    colors: [],
    sizes: Array(6).fill(isTestMode ? 0 : 100),
    drawings: {},
    toppings: [],
  });

  // 💝 게임 진행 상태
  const [gameState, setGameState] = useState({
    currentItemIndex: 0,
    completedStages: [],
    stirCount: 0,
  });

  // 💝 Ref (인터벌 관리)
  const intervalRef = useRef(null);

  // ************ state 모음
  const state = {
    stage,
    currentData,
    selectionState,
    toolState,
    chocolateInfo,
    gameState,
    uiState,
  };

  // ************ set함수 모음
  const setState = {
    setStage,
    setUIState,
    setToolState,
    setSelectionState,
    setChocolateInfo,
    setGameState,
  };

  return { state, setState, intervalRef };
}
