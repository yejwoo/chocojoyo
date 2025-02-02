export default function Stage5Items ({ currentData, selectionState, handleChocolateClick }) {
    return (
      <div className="relative w-72 h-56">
        <Image src={box} alt="초콜릿 틀" width={280} height={280} />
        <div className="w-full flex justify-center items-center flex-wrap absolute gap-x-2 gap-y-2">
          {currentData.shapes.map((item, index) => (
            <div key={index} onClick={() => handleChocolateClick(index)} className="relative w-[80px] h-[76px]">
              <Image src={item.imgSrc} alt={item.alt} />
              <Canvas isSelected={selectionState.currentChocolateIndex === index} strokeColor={selectionState.currentColor} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  