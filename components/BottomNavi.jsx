import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useMemo } from "react";
import { handleTabClick, handleColorSelection, handleToppingSelection } from "@/app/handlers/generalHandlers";
import { handleZoomMode } from "@/app/handlers/stageHandlers/stage5Handlers";
import { magnifierActive, magnifierDefault } from "@/public/images/stage5";

export const BottomNaviItem = ({ naviData, selectionState, setSelectionState, currentTabIndex }) => {
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
            onClick={() => handleToppingSelection(item.name, setSelectionState)}
            className={`w-8 h-8 cursor-pointer rounded-sm ${selectionState.currentTopping === item.name ? "ring-4 ring-brand-200" : ""}`}
          />
        ))}
      </div>
    );
  }

  return null;
};

export const BottomNavi = ({ stage, selectionState, setSelectionState, uiState, setUIState }) => {
  const naviData = bottomNaviConfig[stage];

  const naviItems = useMemo(() => {
    return naviData.map((naviItem, index) => (
      <BottomNaviItem
        key={index}
        naviData={{ ...naviItem, index }}
        selectionState={selectionState}
        setSelectionState={setSelectionState}
        currentTabIndex={selectionState.currentTabIndex}
      />
    ));
  }, [stage, selectionState]);

  return (
    <div className="fixed h-[104px] bottom-0 left-0 right-0">
      {/* ✅ 탭 UI (2개 이상일 때만 표시) */}
      {naviData.length > 1 && (
        <div className="flex h-10">
          {naviData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index, selectionState, setSelectionState, uiState, setUIState)}
              className={`cursor-pointer ${
                selectionState.currentTabIndex === index ? "bg-popup-100" : "bg-gray-warm-50 text-gray-warm-200"
              } w-20 flex items-center justify-center text-xl rounded-tl-xl rounded-tr-xl`}
            >
              {item.title}
            </div>
          ))}
          {/* ✅ 돋보기 버튼 */}
          <button className="px-1 rounded-tl-xl rounded-tr-xl" onClick={() => handleZoomMode(setUIState)}>
            <Image width={40} height={40} src={uiState.isZoomMode ? magnifierActive : magnifierDefault} alt="돋보기" />
          </button>
        </div>
      )}

      {/* ✅ 선택된 탭의 네비 데이터 */}
      <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center">{naviItems}</div>
    </div>
  );
};
