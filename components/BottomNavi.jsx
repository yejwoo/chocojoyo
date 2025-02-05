import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { handleTabClick, handleColorSelection, handleToppingSelection } from "@/app/handlers/generalHandlers";
import { handleZoomMode } from "@/app/handlers/stageHandlers/stage5Handlers";
import { magnifierActive, magnifierDefault, resetActive, resetDefault } from "@/public/images/stage5";
import arrow from "@/public/icons/arrow.svg";

export const BottomNaviItem = ({ naviData, stage, uiState, selectionState, setSelectionState, setUIState, currentTabIndex }) => {
  useEffect(() => {
    if (stage.main === 5 && stage.sub === "init" && uiState.highlightedElement === "item1") {
      setSelectionState((prev) => ({ ...prev, currentTabIndex: 1 }));
    }
  }, [stage, uiState.highlightedElement]);

  useEffect(() => {
    if (uiState.isResetPopupOpen) {
      setUIState((prev) => ({
        ...prev,
        isZoomMode: false,
      }));
    }
  }, [uiState.isResetPopupOpen]);

  if (naviData.type === "color") {
    return Object.keys(naviData.data)
      .filter((item) => item !== "default")
      .map((item, subIndex) => (
        <div
          key={`${naviData.type}-${item}-${subIndex}`}
          onClick={() => handleColorSelection(item, setSelectionState)}
          className={`cursor-pointer flex-shrink-0 rounded-full border-2 w-8 h-8 ${selectionState.currentColor === item ? "ring-4 ring-brand-200" : ""} 
          ${currentTabIndex === naviData.index ? "opacity-100 visible" : "opacity-0 invisible absolute"}`}
          style={{
            backgroundColor: naviData.data[item].fill,
            borderColor: naviData.data[item].border,
          }}
        ></div>
      ));
  }

  if (naviData.type === "image") {
    return (
      <div className={`flex gap-7 ${currentTabIndex === naviData.index ? "opacity-100 visible" : "opacity-0 invisible absolute"}`}>
        {naviData.data.map((item, subIndex) => (
          <Image
            key={`${naviData.type}-${subIndex}-${item.imgSrc}`}
            src={item.imgSrc}
            alt={item.alt || "토핑 이미지"}
            className={`w-8 h-8 cursor-pointer rounded-sm ${selectionState.currentTopping === item.name ? "ring-4 ring-brand-200" : ""}`}
            draggable={false}
            onClick={() => {
              handleToppingSelection(item.name, setSelectionState);
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export const BottomNavi = ({ stage, selectionState, setSelectionState, setChocolateInfo, uiState, setUIState }) => {
  const naviData = bottomNaviConfig[stage.main];

  const naviItems = useMemo(() => {
    return naviData.map((naviItem, index) => (
      <BottomNaviItem
        key={index}
        naviData={{ ...naviItem, index }}
        stage={stage}
        uiState={uiState}
        selectionState={selectionState}
        setSelectionState={setSelectionState}
        setUIState={setUIState}
        // setChocolateInfo={setChocolateInfo}
        currentTabIndex={selectionState.currentTabIndex}
      />
    ));
  }, [stage, selectionState]);

  return (
    <div className={`fixed overflow-hidden h-[132px] bottom-0 left-0 right-0 ${uiState.isOnboarding ? "z-[999] pointer-events-none" : ""}`}>
      {/* ✅ 탭 UI (2개 이상일 때만 표시) */}
      {naviData.length > 1 && (
        <>
          {/* 온보딩 관련 */}
          {stage.main === 5 && stage.sub === "init" && uiState.isOnboarding && (
            <>
              {["left-5", "left-[100px]", "left-[188px]"].map((position, index) => (
                <Image
                  key={index}
                  src={arrow}
                  width={40}
                  height={40}
                  alt="화살표"
                  className={`absolute ${position} top-[-32px] animate-bounce-up-fast 
              ${uiState.highlightedElement === `item${index}` ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="top-[-88px] left-1/2 -translate-x-1/2 w-[343px] text-xl text-center bg-popup-100 px-3 py-2 rounded-md shadow-md absolute">
                {uiState.highlightedElement === "item0"
                  ? "다양한 색깔로 초콜릿을 꾸며보세요!"
                  : uiState.highlightedElement === "item1"
                  ? "그림 위에 토핑을 얹을 수 있어요."
                  : "확대해서 섬세하게 꾸미고, 실수하면 리셋하세요!"}
              </div>
            </>
          )}

          {/* ✅ 탭 + 버튼 컨테이너 */}
          <div className="absolute left-[-8px] bottom-[60px] flex w-full z-10">
            {/* ✅ 탭을 좌측 정렬 */}
            <div className="flex" id="tabs">
              {naviData.map((item, index) => (
                <div key={`${item.type}-${index}-tab`}>
                  <div
                    key={`${index}-bottom-line`}
                    className={`${
                      selectionState.currentTabIndex === index ? "opacity-100 visible" : "opacity-0 invisible"}
                      ${selectionState.currentTabIndex === 0 ? "w-[80px] left-0 " : "left-[88px] w-[76px]" }
                     bg-popup-100 h-1 absolute top-[44px]`}
                  ></div>
                  <div
                    key={index}
                    id={`tab-${item.type}`}
                    onClick={() => handleTabClick(index, selectionState, setSelectionState, uiState, setUIState)}
                    className={`cursor-pointer flex items-center justify-center text-2xl w-[84px] h-12 rounded-tl-xl rounded-tr-xl
              ${
                selectionState.currentTabIndex === index
                  ? "bg-popup-100 border-4 border-default"
                  : "bg-gray-warm-50 text-gray-warm-200 border-b-4 border-b-default"
              }
           `}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ 돋보기 & 리셋 버튼 */}
            <div className={`${stage.main === 5 ? "opacity-100 visible" : "opacity-0 invisible"} flex items-center justify-center pl-2 mb-1`} id="actions">
              <button className="px-1 flex justify-center items-center" onClick={() => handleZoomMode(setUIState)}>
                <Image width={40} height={40} src={uiState.isZoomMode && !uiState.isResetPopupOpen ? magnifierActive : magnifierDefault} alt="돋보기" />
              </button>
              <button className="px-1" onClick={() => setUIState((prev) => ({ ...prev, isResetPopupOpen: true, isResetBtnClicked: !prev.isResetBtnClicked }))}>
                <Image width={40} height={40} src={uiState.isResetBtnClicked ? resetActive : resetDefault} alt="돋보기" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ 네비 데이터 (색깔 선택 부분) */}
      <div className="absolute  bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center border-t-4 border-default">{naviItems}</div>
    </div>
  );
};
