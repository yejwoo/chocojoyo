import { Shapes } from "@/public/icons/shapes";
import Canvas from "./Canvas";
import { chocolateColors, isMobile } from "@/utils/constants";
import Image from "next/image";

export default function Chocolates({
  chocolateInfo,
  selectionState = { currentChocolateIndex: -1, currentColor: "default", currentTopping: "default" },
  uiState = { isResetPopupOpen: false },
  setUIState = () => {},
  handleEvent = () => {},
  isToppingMode = false,
  isZoomMode = false,
  changeCursor = false,
  showDrawings = false,
  chocoRefs = [],
  mode = "stage",
}) {
  return chocolateInfo.shapes.map((item, index) => {
    const name = item[0].toUpperCase() + item.slice(1);
    const ShapeComponent = Shapes[name];
    const color = chocolateInfo.colors[index];
    const topping = chocolateInfo.toppings[index];
    const isSelected = selectionState.currentChocolateIndex === index;
    const cursorImage = changeCursor
      ? `url('/images/stage5/cursors/${
          !isToppingMode ? `cursor-chocopen-${selectionState.currentColor}` : `cursor-topping-${selectionState.currentTopping}`
        }.svg') 10 114, auto`
      : "auto";
    const isZoommed = isZoomMode && isSelected && !uiState.isResetPopupOpen;

    return ShapeComponent ? (
      <div
        key={index}
        ref={(el) => (chocoRefs[index] = el)}
        onClick={() => {
          if (isToppingMode) {
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
          cursor: cursorImage,
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
            width={(64 * (chocolateInfo?.sizes?.[index] || 0)) / 100 || 64}
            height={(56 * (chocolateInfo?.sizes?.[index] || 0)) / 100 || 56}
            fillColor={chocolateColors[color]?.[100] || "#894E00"}
            strokeColor={chocolateColors[color]?.[200] || "#894E00"}
          />
          <Canvas
            isToppingMode={isToppingMode}
            strokeColor={selectionState.currentColor}
            onSave={(imageData) => handleEvent("saveDrawing", imageData, index)}
            uiState={uiState}
            setUIState={setUIState}
            className={isZoommed ? "z-30" : "z-20"}
            showDrawing={showDrawings}
            drawingData={chocolateInfo.drawings[index]}
            mode={mode}
          />
          {topping && (
            // <Image
            //   className={`absolute ${isZoommed ? "z-50" : "z-30"}`}
            //   src={`/images/stage5/toppings/topping-${topping.name}.svg`}
            //   alt="토핑"
            //   width={32}
            //   height={32}
            //   layout="intrinsic"
            //   draggable={false}
            //   style={{
            //     left: `${topping.x}px`,
            //     top: `${topping.y}px`,
            //     transform: "translate(-50%, -50%)",
            //   }}
            //   onTouchStart={(e) => isMobile && handleEvent("touchStart", e, index)}
            //   onTouchMove={(e) => isMobile && handleEvent("touchMove", e, index, isZoomMode)}
            //   onTouchEnd={(e) => isMobile && handleEvent("touchEnd", e, index, isZoomMode)}
            // />
            <div
            className={`absolute ${isZoommed ? "z-50" : "z-30"}`}
            style={{
              width: mode !== "stage" ? "160px" : "32px",  // 크기를 2배로 늘려 화질 개선
              height: mode !== "stage" ? "160px" : "32px",
              left: `${topping.x}px`,
              top: `${topping.y}px`,
              backgroundImage: `url('/images/stage5/toppings/topping-${topping.name}.svg')`,
              backgroundSize: "100% 100%",  // 이미지를 컨테이너에 꽉 차게 렌더링
              backgroundRepeat: "no-repeat",  // 배경 반복 방지
              backgroundPosition: "center",
              transform: `translate(-50%, -50%) ${mode !== "stage" ? "scale(0.2)" : ""}`,  // 모드에 따라 축소 적용
            }}
            onTouchStart={(e) => isMobile && handleEvent("touchStart", e, index)}
            onTouchMove={(e) => isMobile && handleEvent("touchMove", e, index, isZoomMode)}
            onTouchEnd={(e) => isMobile && handleEvent("touchEnd", e, index, isZoomMode)}
          />
          
          )}
        </div>
      </div>
    ) : (
      console.warn(`${name} 컴포넌트 없음`) || null
    );
  });
}
