import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { handleTabClick, handleColorSelection, handleToppingSelection } from "@/app/handlers/generalHandlers";
import { handleBack, handleZoomMode } from "@/app/handlers/stageHandlers/stage5Handlers";
import { chocoepnIcons, pastryBagIcons } from "@/public/images/common/bottom-navi";
import { bottomNaviIcons } from "@/public/images/stage5";

export const BottomNaviItem = ({ naviData, stage, uiState, gameState, selectionState, setSelectionState, setUIState, currentTabIndex }) => {
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

  const renderColorOptions = () => {
    return Object.keys(naviData.data)
      .filter((colorName) => colorName !== "default")
      .map((colorName, subIndex) => (
        <Image
          key={`${naviData.type}-${colorName}-${subIndex}`}
          src={stage.main === 5 ? chocoepnIcons[colorName] : pastryBagIcons[colorName]}
          alt={`${colorName} color`}
          className={`cursor-pointer flex-shrink-0 rounded-full w-9 h-9 bg-gray-warm-50 ${
            selectionState.currentColor === colorName ? "ring-4 ring-brand-200" : ""
          } ${currentTabIndex === naviData.index ? "opacity-100 visible" : "opacity-0 invisible absolute"}`}
          onClick={() => handleColorSelection(colorName, setSelectionState)}
        />
      ));
  };

  const renderImageOptions = () => {
    return (
      <div className={`flex gap-7 ${currentTabIndex === naviData.index ? "opacity-100 visible" : "opacity-0 invisible absolute"}`}>
        {naviData.data.map((item, subIndex) => (
          <Image
            key={`${naviData.type}-${subIndex}-${item.imgSrc}`}
            src={item.imgSrc}
            alt={item.alt || "이미지"}
            className={`w-9 h- cursor-pointer rounded-sm ${selectionState.currentTopping === item.name ? "ring-4 ring-brand-200" : ""}`}
            draggable={false}
            onClick={() => {
              handleToppingSelection(item.name, setSelectionState);
            }}
          />
        ))}
      </div>
    );
  };

  if (naviData.type === "color") return renderColorOptions();
  if (naviData.type === "image") return renderImageOptions();

  return null;
};

export const BottomNavi = ({ stage, selectionState, setSelectionState, setChocolateInfo, uiState, gameState, setGameState, setUIState }) => {
  const naviData = bottomNaviConfig[stage.main];

  const naviItems = useMemo(() => {
    return naviData.map((naviItem, index) => (
      <BottomNaviItem
        key={index}
        naviData={{ ...naviItem, index }}
        stage={stage}
        uiState={uiState}
        gameState={gameState}
        selectionState={selectionState}
        setSelectionState={setSelectionState}
        setUIState={setUIState}
        setGameState={setGameState}
        // setChocolateInfo={setChocolateInfo}
        currentTabIndex={selectionState.currentTabIndex}
      />
    ));
  }, [stage, selectionState]);

  return (
    <div className="fixed overflow-hidden h-[132px] bottom-0 left-0 right-0">
      {/* ✅ 탭 UI (2개 이상일 때만 표시) */}
      {naviData.length > 1 && (
        <>
          {/* ✅ 탭 + 버튼 컨테이너 */}
          <div className="absolute left-[-8px] bottom-[60px] max-h-sm:bottom-[52px] flex w-full z-10">
            {/* ✅ 탭을 좌측 정렬 */}
            <div className="flex" id="tabs">
              {naviData.map((item, index) => (
                <div key={`${item.type}-${index}-tab`}>
                  <div
                    key={`${index}-bottom-line`}
                    className={`${selectionState.currentTabIndex === index ? "opacity-100 visible" : "opacity-0 invisible"}
                      ${selectionState.currentTabIndex === 0 ? "w-[80px] left-0 " : "left-[88px] w-[76px]"}
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
                  : "bg-gray-warm-50 text-gray-warm-200 border-b-4 border-t-4 border-b-default border-t-gray-warm-50"
              }
           `}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ 액션 (돋보기 / 뒤로가기 / 앞으로가기 / 리셋) */}
            <div className={`${stage.main === 5 ? "opacity-100 visible" : "opacity-0 invisible"} flex items-center justify-center pl-2 mb-1`} id="actions">
              <button className="px-1 flex justify-center items-center" onClick={() => handleZoomMode(setUIState)}>
                <Image
                  width={36}
                  height={36}
                  src={uiState.isZoomMode && !uiState.isResetPopupOpen ? bottomNaviIcons.magnifierActive : bottomNaviIcons.magnifierDefault}
                  alt="돋보기"
                />
              </button>
              <button className="px-1" onClick={() => handleBack(gameState, setChocolateInfo, selectionState, setUIState)}>
                <Image width={36} height={36} src={bottomNaviIcons.backDefault} alt="뒤로가기" />
              </button>
              <button className="px-1" onClick={() => setUIState((prev) => ({ ...prev, isFrontBtnClicked: true }))}>
                <Image width={36} height={36} src={bottomNaviIcons.frontDefault} alt="앞으로" />
              </button>
              <button className="px-1" onClick={() => setUIState((prev) => ({ ...prev, isResetPopupOpen: true, isResetBtnClicked: !prev.isResetBtnClicked }))}>
                <Image width={36} height={36} src={uiState.isResetBtnClicked ? bottomNaviIcons.resetActive : bottomNaviIcons.resetDefault} alt="돋보기" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ 네비 데이터 (색깔 선택 부분) */}
      <div className="absolute bg-popup-100 left-0 right-0 h-16 max-h-sm:h-14 bottom-0 flex gap-7 justify-center items-center border-t-4 border-default">
        {naviItems}
      </div>
    </div>
  );
};
