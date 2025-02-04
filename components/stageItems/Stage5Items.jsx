import Image from "next/image";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import { bottomNaviConfig } from "@/data/Stage";
import Canvas from "../Canvas";

export default function Stage5Items({ currentData, chocolateInfo, selectionState, uiState }) {
  const chocolateColors = bottomNaviConfig[4][0].data;

  return (
    <>
      <div className="relative w-[280px] h-[182px]">
        <Image
          src={box}
          alt="초콜릿 틀"
          width={280}
          height={280}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={{
            pointerEvents: "none",
            WebkitTouchCallout: "none",
            TouchAction: "none",
          }}
        />
        {/* 초콜릿들 */}
        <div className="w-full flex justify-center items-center flex-wrap absolute gap-x-2 gap-y-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {chocolateInfo.shapes.map((item, index) => {
            const name = item[0].toUpperCase() + item.slice(1);
            const ShapeComponent = Shapes[name];
            const color = chocolateInfo.colors[index];
            const isSelected = selectionState.currentChocolateIndex === index;
            const isChocoPenMode = selectionState.currentTabIndex === 0;

            return ShapeComponent ? (
              <div
                key={index}
                // onMouseOver={() => setCurrentChocolateIndex(index)}
                // onMouseLeave={() => setCurrentChocolateIndex(null)}
                // onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className={`flex-shrink-0 cursor-${
                  isChocoPenMode ? "chocopen" : selectionState.currentTopping
                } relative w-[80px] h-[76px] bg-gray-warm-300 rounded-xl`}
                style={{
                  WebkitTouchCallout: "none",
                  TouchAction: "none",
                }}
              >
                <div className={`${uiState.isZoomMode && isSelected ? "z-10" : ""} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
                  <ShapeComponent
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className={uiState.isZoomMode && isSelected ? "scale-[2] transition duration-200 ease-in-out" : ""}
                    width={(64 * (chocolateInfo.sizes[index] || 0)) / 100}
                    height={(56 * (chocolateInfo.sizes[index] || 0)) / 100}
                    fillColor={chocolateColors[color]?.fill}
                    strokeColor={chocolateColors[color]?.border}
                  />
                </div>
                {/* <Canvas isSelected={isSelected} isZoomMode={uiState.isZoomMode} strokeColor={selectionState.currentColor} /> */}
              </div>
            ) : (
              console.warn(`${name} 컴포넌트 없음`) || null
            );
          })}
        </div>
      </div>
    </>
  );
}
