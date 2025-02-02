export default function Stage2Items ({ currentData, handleEvent, positionState, toolState, toggleToolState }) {
    return (
      <div className="relative">
        <div className="relative w-72 h-72">
          {currentData.items.map((item, i) => (
            <Image
              key={i}
              className={`${
                positionState.currentIndex === i ? "opacity-100 visible" : "opacity-0 invisible"
              } absolute bottom-0`}
              src={item.imgSrc}
              alt={item.alt}
            />
          ))}
        </div>
        <div
          style={{
            top: `${positionState.currentToolPosition.top}px`,
            right: `${positionState.currentToolPosition.right}px`,
          }}
          className={`${
            toolState === "off" ? "w-6" : "w-8"
          } absolute cursor-pointer`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => {
            toggleToolState();
            handleEvent(currentData.items[positionState.currentIndex].type, "_", positionState.currentIndex);
          }}
        >
          <Image src={currentData.tool[toolState].imgSrc} alt={currentData.tool[toolState].alt} />
        </div>
      </div>
    );
  };
  