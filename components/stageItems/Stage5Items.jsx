import Image from "next/image";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import Canvas from "../Canvas";
import { chocolateColors } from "@/utils/constants";

export default function Stage5Items({ chocolateInfo, selectionState, uiState, setUIState, handleEvent }) {
  const isToppingMode = selectionState.currentTabIndex === 1;
  const isZoomMode = uiState.isZoomMode;

  return (
    <>
      <div className="absolute bottom-[82px] max-h-sm:bottom-[54px] w-[280px] h-[180px] flex justify-center items-center">
        <Image
          src={box}
          alt="초콜릿 틀"
          width={280}
          height={280}
          className="absolute bottom-0"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={{
            pointerEvents: "none",
            WebkitTouchCallout: "none",
            TouchAction: "none",
          }}
        />
        {/* 초콜릿들 */}
        <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
          {chocolateInfo.shapes.map((item, index) => {
            const name = item[0].toUpperCase() + item.slice(1);
            const ShapeComponent = Shapes[name];
            const color = chocolateInfo.colors[index];
            const isSelected = selectionState.currentChocolateIndex === index;
            const cursorImage = !isToppingMode
              ? `/images/stage5/cursors/cursor-chocopen-${selectionState.currentColor}.svg`
              : `/images/stage5/cursors/cursor-topping-${selectionState.currentTopping}.svg`;

            return ShapeComponent ? (
              <div
                key={index}
                onClick={() => {
                  if (isToppingMode && !isZoomMode) {
                    handleEvent("clickTopping", "_", index);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onMouseOver={() => {
                  if (!uiState.isResetPopupOpen) handleEvent("mouseOver", "_", index);
                }}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className="flex-shrink-0 relative w-[80px] h-[76px] bg-gray-warm-300 rounded-xl"
                style={{
                  cursor: `url('${cursorImage}') 10 114, auto`,
                  WebkitTouchCallout: "none",
                  TouchAction: "none",
                }}
              >
                <div
                  className={`${
                    isZoomMode && isSelected && !uiState.isResetPopupOpen ? "z-30" : "z-10"
                  } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  style={{
                    overflow: isZoomMode && isSelected && !uiState.isResetPopupOpen ? "visible" : "hidden",
                  }}
                >
                  <ShapeComponent
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className={isZoomMode && isSelected && !uiState.isResetPopupOpen ? "scale-[2.2] transition duration-200 ease-in-out z-20" : "z-10"}
                    style={{
                      transformOrigin: "center",
                    }}
                    width={(64 * (chocolateInfo.sizes[index] || 0)) / 100}
                    height={(56 * (chocolateInfo.sizes[index] || 0)) / 100}
                    fillColor={chocolateColors[color]?.[100] || "#894E00"}
                    strokeColor={chocolateColors[color]?.[200] || "#894E00"}
                  />
                </div>
                <Canvas
                  isSelected={isSelected}
                  isZoomMode={isZoomMode}
                  isToppingMode={isToppingMode}
                  strokeColor={selectionState.currentColor}
                  onSave={(imageData) => handleEvent("saveDrawing", imageData, index)}
                  uiState={uiState}
                  setUIState={setUIState}
                />
                {/* 토핑 렌더링 */}
                {chocolateInfo.toppings[index] && (
                  <Image
                    className={`absolute left-6 top-[22px] ${
                      isZoomMode && isSelected && !uiState.isResetPopupOpen ? "scale-[2.2] transition duration-200 ease-in-out z-40" : "z-30"
                    }`}
                    src={`/images/stage5/toppings/topping-${chocolateInfo.toppings[index]}.svg`}
                    alt="토핑"
                    width={32}
                    height={32}
                    draggable
                    // onDragStart={() => handleEvent("dragStartTopping")}
                  />
                )}
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
