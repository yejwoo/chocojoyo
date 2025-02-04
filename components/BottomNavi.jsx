import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useMemo, useCallback } from "react";

export const BottomNaviItem = ({ naviData, selectionState, setSelectionState, currentTabIndex }) => {
  const handleColorSelection = useCallback(
    (color) => {
      setSelectionState((prev) => ({ ...prev, currentChocoPenColor: color }));
    },
    [setSelectionState]
  );

  const handleToppingSelection = useCallback(
    (topping) => {
      setSelectionState((prev) => ({ ...prev, currentTopping: topping }));
    },
    [setSelectionState]
  );

  if (naviData.type === "color") {
    return Object.keys(naviData.data)
      .filter((item) => item !== "default")
      .map((item, subIndex) => (
        <div
          key={`${naviData.type}-${item}-${subIndex}`}
          onClick={() => handleColorSelection(item)}
          className={`cursor-pointer flex-shrink-0 rounded-full border-2 w-8 h-8 ${
            selectionState.currentChocoPenColor === item ? "ring-4 ring-brand-200" : ""
          } 
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
      <div
        className={`flex gap-7 ${
          currentTabIndex === naviData.index ? "opacity-100 visible" : "opacity-0 invisible absolute"
        }`}
      >
        {naviData.data.map((item, subIndex) => (
          <Image
            key={`${naviData.type}-${subIndex}-${item.imgSrc}`}
            src={item.imgSrc}
            alt={item.alt || "토핑 이미지"}
            onClick={() => handleToppingSelection(item.name)}
            className={`w-8 h-8 cursor-pointer rounded-sm ${
              selectionState.currentTopping === item.name ? "ring-4 ring-brand-200" : ""
            }`}
          />
        ))}
      </div>
    );
  }

  return null;
};

export const BottomNavi = ({ stage, selectionState, setSelectionState }) => {
  const naviData = bottomNaviConfig[stage];

  const naviItems = useMemo(() => {
    return naviData.map((naviItem, index) => (
      <BottomNaviItem
        key={index}
        naviData={{ ...naviItem, index }} // 인덱스 추가
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
              onClick={() => setSelectionState((prev) => ({ ...prev, currentTabIndex: index }))}
              className={`cursor-pointer ${
                selectionState.currentTabIndex === index ? "bg-popup-100" : "bg-gray-warm-50 text-gray-warm-200"
              } w-20 flex items-center justify-center text-xl rounded-tl-xl rounded-tr-xl`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}

      {/* ✅ 선택된 탭의 네비 데이터 */}
      <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center">
        {naviItems}
      </div>
    </div>
  );
};
