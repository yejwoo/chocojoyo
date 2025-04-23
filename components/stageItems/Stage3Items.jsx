import { arrowUp } from "@/public/images/common";
import Image from "next/image";
import { useRef } from "react";

export default function Stage3Items({ currentData, gameState, handleEvent, toolState, uiState, setUIState }) {
  const tool = currentData.items[0];
  const doubleBoiler = currentData.items[1];
  const chocolates = currentData.items.slice(2);
  const rotationRef = useRef(false);

  const handleItemClick = (e) => {
    if (!uiState.isClicked) {
      setUIState((prev) => ({ ...prev, isClicked: true }));
    }
    handleEvent(e, null, null, rotationRef);
  };

  return (
    <div className="relative w-60 h-72">
      {!uiState.isClicked && (
        <>
          <Image
            src={arrowUp}
            alt="손가락"
            className="absolute z-10 bottom-10 right-[72px] animate-float-y-center transition-opacity duration-300"
            style={{ width: "48px", height: "48px" }}
          />
        </>
      )}
      <div className="absolute w-full h-[230px] top-1/2 -translate-y-1/2 ">
        {/* 초콜릿 중탕기 */}
        <Image src={doubleBoiler.imgSrc} alt={doubleBoiler.alt} className="absolute bottom-0" />

        {/* 초콜릿 덩어리  */}
        <div className="absolute w-40 h-40 left-1/2 top-8 -translate-x-1/2">
          {chocolates.map((item, index) => (
            <Image
              key={index}
              src={item.imgSrc}
              alt={item.alt}
              className={`${gameState.currentItemIndex === index ? "opacity-100 visible" : "opacity-0 invisible"} absolute bottom-0`}
              style={{
                transform: `rotate(${toolState.rotation}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      {/* 스패츌라  */}
      <div id="tool-container" className="w-full h-72 absolute bottom-0">
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
          onClick={(e) => handleItemClick(e)}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          src={tool.imgSrc}
          alt={tool.alt}
        />
      </div>
    </div>
  );
}
