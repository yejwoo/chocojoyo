import Image from "next/image";

//   handleChop(gameState, setGameState, positionState, setPositionState, currentData);
export default function Stage2Items({ currentData, handleEvent, positionState, gameState}) {
  const items = currentData.items;
  const tool = currentData.items[0];

  return (
    <div className="relative">
      <div className="relative w-72 h-72">
        {items
          .filter((_, idx) => idx !== 0)
          .map((item, i) => (
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
          top: `${positionState.x}px`,
          right: `${positionState.y}px`,
        }}
        className="w-6 absolute cursor-pointer"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onClick={() => {
          handleEvent("_", "_", positionState);
        }}
      >
        <Image src={tool.imgSrc} alt={tool.alt} />
      </div>
    </div>
  );
}

// handleChop(gameState, setGameState, positionState, setPositionState, currentData);

