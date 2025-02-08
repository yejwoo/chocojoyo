import { arrowDown } from "@/public/images/common";
import Image from "next/image";

export default function Stage2Items({ currentData, handleEvent, toolState, gameState, uiState, setUIState }) {
  const items = currentData.items.slice(1);
  const tool = currentData.items[0];
  const handleItemClick = () => {
    if (!uiState.isClicked) {
      setUIState((prev) => ({ ...prev, isClicked: true }));
    }
    handleEvent();
  };

  return (
    <div className="relative w-72 h-72">
      {!uiState.isClicked && (
        <Image
          src={arrowDown}
          alt="화살표"
          className="absolute z-10 top-[-20px] right-[54px] animate-float-y transition-opacity duration-300"
          style={{ width: "48px", height: "48px" }}
        />
      )}
      <div className="absolute w-full h-40 top-1/2 -translate-y-1/2">
        {items.map((item, i) => (
          <Image
            key={i}
            className={`${gameState.currentItemIndex === i ? "opacity-100 visible" : "opacity-0 invisible"} absolute bottom-0`}
            src={item.imgSrc}
            alt={item.alt}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        ))}
      </div>
      <div
        style={{
          left: `${toolState.position.x}px`,
          top: `${toolState.position.y}px`,
          rotate: `${toolState.rotation}deg`,
          scale: toolState.size,
        }}
        className="w-16 absolute cursor-pointer flex justify-center"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onClick={handleItemClick}
      >
        <Image width={24} src={tool.imgSrc} alt={tool.alt} />
      </div>
    </div>
  );
}
