import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { handleTabClick, handleColorSelection, handleToppingSelection } from "@/app/handlers/generalHandlers";
import { handleReset, handleZoomMode } from "@/app/handlers/stageHandlers/stage5Handlers";
import { magnifierActive, magnifierDefault, resetActive, resetDefault } from "@/public/images/stage5";
import Modal from "./Modal";
import arrow from "@/public/icons/arrow.svg";

export const BottomNaviItem = ({ naviData, stage, uiState, selectionState, setSelectionState, setChocolateInfo, currentTabIndex }) => {
  useEffect(() => {
    if (stage.main === 5 && stage.sub === "init" && uiState.highlightedElement === "item1") {
      setSelectionState((prev) => ({ ...prev, currentTabIndex: 1 }));
    }
  }, [stage, uiState.highlightedElement]);

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
        setChocolateInfo={setChocolateInfo}
        currentTabIndex={selectionState.currentTabIndex}
      />
    ));
  }, [stage, selectionState]);

  return (
    <div className={`fixed h-[104px] bottom-0 left-0 right-0 ${uiState.isOnboarding ? "z-[999] pointer-events-none" : ""}`}>
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
              <div
                className="top-[-88px] left-1/2 -translate-x-1/2 w-[343px] text-xl text-center bg-popup-100 px-3 py-2 rounded-md shadow-md absolute
              "
              >
                {uiState.highlightedElement === "item0"
                  ? "다양한 색깔로 초콜릿을 꾸며보세요!"
                  : uiState.highlightedElement === "item1"
                  ? "그림 위에 토핑을 얹을 수 있어요."
                  : "확대해서 섬세하게 꾸미고, 실수하면 리셋하세요!"}
              </div>
            </>
          )}
          <div className="flex h-10" id="tabs">
            {naviData.map((item, index) => (
              <div
                key={index}
                id={`tab-${item.type}`}
                onClick={() => handleTabClick(index, selectionState, setSelectionState, uiState, setUIState)}
                className={`cursor-pointer 
               ${selectionState.currentTabIndex === index ? "bg-popup-100" : "bg-gray-warm-50 text-gray-warm-200"} 
               w-20 flex items-center justify-center text-xl rounded-tl-xl rounded-tr-xl`}
              >
                {item.title}
              </div>
            ))}
            {/* ✅ 돋보기 버튼 */}
            <div className="flex justify-center">
              <button className="px-1 flex justify-center items-center" onClick={() => handleZoomMode(setUIState)}>
                <Image width={40} height={40} src={uiState.isZoomMode ? magnifierActive : magnifierDefault} alt="돋보기" />
              </button>
              {/* ✅ 리셋 버튼 */}
              <button className="px-1" onClick={() => setUIState((prev) => ({ ...prev, isResetPopupOpen: true, isResetBtnClicked: !prev.isResetBtnClicked }))}>
                <Image width={40} height={40} src={uiState.isResetBtnClicked ? resetActive : resetDefault} alt="돋보기" />
              </button>
            </div>
          </div>
          {/* ✅ 리셋 팝업(모달) */}
          {uiState.isResetPopupOpen && (
            <Modal
              type="confirm"
              title="초콜릿 다시 꾸미기"
              onCancel={() => setUIState((prev) => ({ ...prev, isResetPopupOpen: false, isResetBtnClicked: !prev.isResetBtnClicked }))}
              onConfirm={() => handleReset(setChocolateInfo, setUIState)}
            >
              그린 그림과 토핑이 사라져요.
              <br />
              처음부터 다시 꾸며볼까요?
            </Modal>
          )}
        </>
      )}

      {/* ✅ 선택된 탭의 네비 데이터 */}
      <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center">{naviItems}</div>
    </div>
  );
};
