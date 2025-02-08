import Image from "next/image";
import mold from "@/public/images/stage4/chocolate-mold.svg";
import { Shapes } from "@/public/icons/shapes";
import { PastryBag } from "@/public/images/stage4";
import { useEffect } from "react";
import { updatePastryBagPosition, updatePastryBagVisibility } from "@/app/handlers/stageHandlers/stage4Handlers";
import { chocolateColors } from "@/utils/constants";

export default function Stage4Items({
  currentData,
  selectionState,
  setSelectionState,
  uiState,
  setUIState,
  toolState,
  setToolState,
  handleEvent,
  chocolateInfo,
}) {

  // ✅ 짤주머니 숨김 처리 로직
  useEffect(() => {
    updatePastryBagVisibility(chocolateInfo, setUIState);
  }, [chocolateInfo.sizes, setUIState]);

  // ✅ 초콜릿이 100% 차면 자동 이동
  useEffect(() => {
    updatePastryBagPosition(selectionState, chocolateInfo, currentData, setSelectionState, setToolState, setUIState);
  }, [chocolateInfo.sizes, selectionState.currentChocolateIndex]);

  return (
    <>
      <div className="relative w-[280px] h-[182px]">
        <Image
          src={mold}
          alt="초콜릿 틀"
          width={280}
          height={280}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={{
            pointerEvents: "none",
            TouchAction: "none",
          }}
        />
        {/* 초콜릿들 */}
        <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {chocolateInfo.shapes.map((item, index) => {
            const name = item[0].toUpperCase() + item.slice(1);
            const ShapeComponent = Shapes[name];
            const color = chocolateInfo.colors[index];

            return ShapeComponent ? (
              <div
                key={index}
                // onClick={() => handleEvent("click", null, index)}
                // onMouseDown={() => handleEvent("press", null, index)}
                // onTouchStart={() => handleEvent("press", null, index)}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                className="flex-shrink-0 cursor-pointer relative w-16 h-14"
                style={{
                  WebkitTouchCallout: "none",
                  TouchAction: "none",
                }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* 틀 */}
                  <ShapeComponent
                    style={{
                      pointerEvents: "none",
                      WebkitTouchCallout: "none",
                      TouchAction: "none",
                    }}
                    fillColor="#A9A9A9"
                    strokeColor="#9E9C9D"
                    width={64}
                    height={56}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* 실제 초콜릿 */}
                  <ShapeComponent
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    width={(64 * (chocolateInfo.sizes[index] || 0)) / 100}
                    height={(56 * (chocolateInfo.sizes[index] || 0)) / 100}
                    fillColor={chocolateColors[color]?.[100] || '#894E00'}
                    strokeColor={chocolateColors[color]?.[200] || '#894E00'}
                  />
                </div>
              </div>
            ) : (
              console.warn(`${name} 컴포넌트 없음`) || null
            );
          })}
        </div>
      </div>

      {/* ✅ 짤주머니 렌더링 및 위치 업데이트 */}
      <div className={`${uiState.isPastryBagHidden ? "hidden" : ""} w-[280px] h-[332px] bottom-0 pastry-bag-area absolute pointer-events-none`}>
        <PastryBag
          fillColor={selectionState.currentColor}
          className={`${uiState.isPastryBagHidden ? "hidden" : ""}`}
          style={{
            position: "absolute",
            cursor: "grab",
            left: `${toolState.position.x}px`,
            top: `${toolState.position.y}px`,
            WebkitTouchCallout: "none",
            TouchAction: "none",
            pointerEvents: "auto",
            userSelect: "none",
          }}
          onClick={() => handleEvent("click", null, selectionState.currentChocolateIndex)}
          onMouseDown={() => handleEvent("press", null, selectionState.currentChocolateIndex)}
          onTouchStart={() => handleEvent("press", null, selectionState.currentChocolateIndex)}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </>
  );
}
