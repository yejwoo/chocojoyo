import Image from "next/image";
import ProgressBar from "../ProgressBar";

export default function Stage2Items({ currentData, handleEvent, toolState, gameState }) {
  const items = currentData.items.slice(1);
  const tool = currentData.items[0];
  const totalItems = items.length;

  return (
    <div className="ralative w-full h-72">
      <div className="absolute w-full h-full bottom-0">
        {items.map((item, i) => (
          <Image
            key={i}
            className={`${gameState.currentItemIndex === i ? "opacity-100 visible" : "opacity-0 invisible"} absolute bottom-0`}
            src={item.imgSrc}
            alt={item.alt}
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
        onClick={() => handleEvent()}
      >
        <Image width={24} src={tool.imgSrc} alt={tool.alt} />
      </div>
    </div>
  );
}
