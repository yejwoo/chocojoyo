import Image from "next/image";

export default function Stage3Items({ currentData, stirCount, handleStart, handleMove, handleEnd, toolState }) {
  // const items = currentData.items.slice(1);
  const tool = currentData.items[0];
  const doubleBoiler = currentData.items[1];
  const chocolates = currentData.items.slice(2);
  console.log(chocolates);

  return (
    <>
      <div className="relative w-60 h-56">
        <Image src={doubleBoiler.imgSrc} alt={doubleBoiler.alt} className="absolute bottom-0" />
        <div className="absolute w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {chocolates.map((item, index) => (
          <Image key={index} src={item.imgSrc} alt={item.alt} className="absolute bottom-0" />
        ))}
      </div>
      {/* 스패츌라 */}
      </div>
      <div className="w-full h-96 bottom-[-20px] absolute">
        <Image
          style={{
            position: "absolute",
            cursor: "grab",
            left: `${toolState.position.x}px`,
            top: `${toolState.position.y}px`,
            WebkitTouchCallout: "none",
            TouchAction: "none",
          }}
          className="w-24 cursor-pointer"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          src={tool.imgSrc}
          alt={tool.alt}
        />
      </div>
    </>
  );
}
