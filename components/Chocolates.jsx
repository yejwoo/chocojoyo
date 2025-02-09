import { Shapes } from "@/public/icons/shapes";
import Canvas from "./Canvas";
import { chocolateColors, isMobile } from "@/utils/constants";
import Image from "next/image";

export default function Chocolates({ chocolateInfo, selectionState, uiState, setUIState, handleEvent, isToppingMode, isZoomMode }) {
  return chocolateInfo.shapes.map((item, index) => {
    const name = item[0].toUpperCase() + item.slice(1);
    const ShapeComponent = Shapes[name];
    const color = chocolateInfo.colors[index];
    const topping = chocolateInfo.toppings[index];
    const isSelected = selectionState.currentChocolateIndex === index;
    const cursorImage = !isToppingMode
      ? `/images/stage5/cursors/cursor-chocopen-${selectionState.currentColor}.svg`
      : `/images/stage5/cursors/cursor-topping-${selectionState.currentTopping}.svg`;
    const isZoommed = isZoomMode && isSelected && !uiState.isResetPopupOpen;

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
        className="flex-shrink-0 relative w-[80px] h-[76px] rounded-xl flex justify-center items-center"
        style={{
          cursor: `url('${cursorImage}') 10 114, auto`,
          WebkitTouchCallout: "none",
          TouchAction: "none",
        }}
      >
        {/* 초콜릿, 그림, 토핑 부모 컨테이너 */}
        <div className={`relative ${isZoommed ? "scale-[2.2] z-40" : "z-20"} w-16 h-14 transition duration-200 ease-in-out`}>
          <ShapeComponent
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="z-10"
            style={{
              transformOrigin: "center",
            }}
            width={(64 * (chocolateInfo.sizes[index] || 0)) / 100}
            height={(56 * (chocolateInfo.sizes[index] || 0)) / 100}
            fillColor={chocolateColors[color]?.[100] || "#894E00"}
            strokeColor={chocolateColors[color]?.[200] || "#894E00"}
          />

          <Canvas
            isSelected={isSelected}
            isZoomMode={isZoomMode}
            isToppingMode={isToppingMode}
            strokeColor={selectionState.currentColor}
            onSave={(imageData) => handleEvent("saveDrawing", imageData, index)}
            uiState={uiState}
            setUIState={setUIState}
            className={isZoommed ? "z-30" : "z-20"}
          />

          {topping && (
            <Image
              className={`absolute ${isZoommed ? "z-50" : "z-30"}`}
              src={`/images/stage5/toppings/topping-${topping.name}.svg`}
              alt="토핑"
              width={32}
              height={32}
              draggable={false}
              style={{
                left: `${topping.x}px`,
                top: `${topping.y}px`,
                transform: "translate(-50%, -50%)", // 확대 없이 위치 유지
              }}
              onTouchStart={(e) => isMobile && handleEvent("touchStart", e, index)}
              onTouchMove={(e) => isMobile && handleEvent("touchMove", e, index)}
              onTouchEnd={(e) => isMobile && handleEvent("touchEnd", e, index)}
            />
          )}
        </div>
      </div>
    ) : (
      console.warn(`${name} 컴포넌트 없음`) || null
    );
  });
}
