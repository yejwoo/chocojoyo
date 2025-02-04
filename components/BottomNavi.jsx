import { bottomNaviConfig } from "@/data/Stage";
import Image from "next/image";
import { useMemo, useCallback } from "react";

export const BottomNaviItem = ({ naviData, selectionState, setSelectionState }) => {
  
  const handleColorSelection = useCallback((color) => {
    setSelectionState((prev) => ({ ...prev, currentColor: color }));
  }, [setSelectionState]);

  const handleToppingSelection = useCallback((topping) => {
    setSelectionState((prev) => ({ ...prev, currentTopping: topping }));
  }, [setSelectionState]);

  switch (naviData.type) {
    case "color":
      return Object.keys(naviData.data)
        .filter((item) => item !== "default")
        .map((item, subIndex) => (
          <div
            key={subIndex}
            onClick={() => handleColorSelection(item)} // `useCallback`으로 최적화된 핸들러 사용
            className="cursor-pointer flex-shrink-0 rounded-full border-2 w-8 h-8"
            style={{
              backgroundColor: naviData.data[item].fill,
              borderColor: naviData.data[item].border,
            }}
          ></div>
        ));
    case "image":
      return (
        <div className="flex gap-7">
          {naviData.data.map((item, subIndex) => (
            <Image 
              onClick={() => handleToppingSelection(item)} // `useCallback` 적용
              key={subIndex} 
              src={item.imgSrc} 
              alt={item.alt || "토핑 이미지"} 
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export const BottomNavi = ({ stage, selectionState, setSelectionState }) => {
  const naviItems = useMemo(() => {
    return bottomNaviConfig[stage].map((naviData, index) => (
      <BottomNaviItem 
        key={index} 
        naviData={naviData} 
        selectionState={selectionState} 
        setSelectionState={setSelectionState} 
      />
    ));
  }, [stage]); // stage가 바뀔 때만 다시 계산됨 (selectionState 변경 시 리렌더 방지)

  return (
    <div className="fixed h-[104px] bottom-0 left-0 right-0">
      <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center">
        {naviItems}
      </div>
    </div>
  );
};