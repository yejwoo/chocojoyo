import Image from "next/image";

export default function Stage2Items({ currentData, handleEvent, toolState, gameState }) {
  const items = currentData.items.slice(1);
  const tool = currentData.items[0];

  return (
    <div className="relative">
      <div className="relative w-72 h-72">
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
