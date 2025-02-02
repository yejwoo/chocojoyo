export default function Stage4Items ({ currentData, selectionState, handleChocolateClick }) {
    return (
      <div className="relative w-72 h-56">
        <Image src={mold} alt="초콜릿 틀" width={280} height={280} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {currentData.shapes.map((item, index) => (
            <div key={index} onClick={() => handleChocolateClick(index)} className="flex-shrink-0 cursor-pointer relative w-16 h-14">
              <Image src={item.imgSrc} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  