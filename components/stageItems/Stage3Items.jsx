import Image from "next/image";
import ProgressBar from "../ProgressBar";

export default function Stage3Items({ currentData, gameState, handleEvent, toolState }) {
  const tool = currentData.items[0];
  const doubleBoiler = currentData.items[1];
  const chocolates = currentData.items.slice(2);

  return (
    <div className="relative w-60 h-56">
      <ProgressBar gameState={gameState} />

      {/* 초콜릿 중탕기 */}
      <Image src={doubleBoiler.imgSrc} alt={doubleBoiler.alt} className="absolute bottom-0" />

      {/* 초콜릿 덩어리 */}
      <div className="absolute w-40 h-40 left-1/2 top-6 -translate-x-1/2">
        {chocolates.map((item, index) => {
          return <Image key={index} src={item.imgSrc} alt={item.alt} className={`${gameState.currentItemIndex === index ? "opacity-100 visible" : "opacity-0 invisible"} absolute bottom-0`} />;
        })}
      </div>

      {/* 스패츌라 (드래그 가능) */}
      <div id="tool-container" className="w-full h-72 absolute bottom-0 border border-red-500">
        <Image
          style={{
            position: "absolute",
            cursor: "grab",
            left: `${toolState.position.x}px`,
            top: `${toolState.position.y}px`,
            WebkitTouchCallout: "none",
            touchAction: "none",
          }}
          className="w-24 cursor-pointer"
          onMouseDown={(e) => handleEvent("stirStart", null, null, e)}
          onTouchStart={(e) => handleEvent("stirStart", null, null, e)}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          src={tool.imgSrc}
          alt={tool.alt}
        />
      </div>
    </div>
  );
}
