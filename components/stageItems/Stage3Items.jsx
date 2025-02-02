export default function Stage3Items ({ currentData, stirCount, handleStart, handleMove, handleEnd, positionState }) {
    return (
      <>
        <div className="relative w-72 h-72">
          {currentData.items.map((item, index) => (
            <Image
              key={index}
              src={item.imgSrc}
              alt={item.alt}
              className={`absolute bottom-0 ${
                stirCount >= index * 5 ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            />
          ))}
        </div>
        <div className="w-full h-96 bottom-[-20px] absolute">
          <Image
            style={{
              position: "absolute",
              cursor: "grab",
              left: `${positionState.position.x}px`,
              top: `${positionState.position.y}px`,
              WebkitTouchCallout: "none",
              TouchAction: "none",
            }}
            className="w-32 cursor-pointer"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            src={currentData.tool.off.imgSrc}
            alt={currentData.tool.off.alt}
          />
        </div>
      </>
    );
  };
  