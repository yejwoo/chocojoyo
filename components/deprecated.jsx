<div className="absolute bottom-[132px] left-1/2 w-[296px] -translate-x-1/2 flex justify-center gap-6 flex-wrap animate-bounce-up-once">
{/* Stage 1 렌더링 */}
{stage.main === "stage1" && (
  <>
    {stageItems[stage.main].items.map((item, index) => (
      <div
        onClick={() => {
          handleEvent(item.type, item.variant, index);
        }}
        className="relative w-20 h-20 flex items-center justify-center cursor-pointer"
        key={index}
      >
        <Image
          src={item.imgSrc}
          width={80}
          height={80}
          alt={item.alt}
        />
        <Image
          className={`${
            chocolateInfo.shapes.includes(item.variant)
              ? ""
              : "hidden"
          } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          src={checkLg}
          alt="완료"
        />
      </div>
    ))}
  </>
)}

{/* Stage 2 렌더링 */}
{stage.main === "stage2" && (
  <>
    <div className="relative">
      <div className="relative w-72 h-72">
        {stageItems[stage.main].items.map((item, i) => (
          <Image
            key={i}
            className={`${
              currentIndex === i
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            } absolute bottom-0`}
            src={item.imgSrc}
            alt={item.alt}
          />
        ))}
      </div>
      <div
        style={{
          top: `${currentToolPosition.top}px`,
          right: `${currentToolPosition.right}px`,
        }}
        className={`${
          toolState === "off" ? "w-6" : "w-8"
        } absolute cursor-pointer`}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onClick={() => {
          toggleToolState();
          handleEvent(
            stageItems[stage.main].items[currentIndex].type,
            "_",
            currentIndex
          );
        }}
      >
        <Image
          src={stageItems[stage.main].tool[toolState].imgSrc}
          alt={stageItems[stage.main].tool[toolState].alt}
        />
      </div>
    </div>
  </>
)}

{/* Stage 3 렌더링 */}
{stage.main === "stage3" && (
  <>
    <div className="relative w-72 h-72">
      <Image
        src={stageItems[stage.main].items[0].imgSrc}
        alt={stageItems[stage.main].items[0].alt}
        className={`absolute bottom-0 ${
          stirCount < 5
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />
      <Image
        src={stageItems[stage.main].items[1].imgSrc}
        alt={stageItems[stage.main].items[1].alt}
        className={`absolute bottom-0 ${
          stirCount >= 5 && stirCount < 10
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />
      <Image
        src={stageItems[stage.main].items[2].imgSrc}
        alt={stageItems[stage.main].items[2].alt}
        className={`absolute bottom-0 ${
          stirCount >= 10
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />
    </div>
    <div className="w-full h-96 bottom-[-20px] absolute">
      <Image
        style={{
          position: "absolute",
          cursor: "grab",
          left: `${position.x}px`,
          top: `${position.y}px`,
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
        src={stageItems[stage.main].tool.off.imgSrc}
        alt={stageItems[stage.main].tool.off.alt}
      />
    </div>
  </>
)}

{/* Stage 4 렌더링 */}
{stage.main === "stage4" && (
  <>
    <div className="relative w-72 h-56">
      <Image
        src={mold}
        alt="초콜릿 틀"
        width={280}
        height={280}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        style={{
          pointerEvents: "none",
          WebkitTouchCallout: "none",
          TouchAction: "none",
        }}
      />
      {/* 초콜릿들 */}
      <div className="w-full flex justify-center items-center flex-wrap absolute gap-6 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {shapes.map((item, index) => {
          const name = item[0].toUpperCase() + item.slice(1);
          const ShapeComponent = Shapes[name];
          const color = chocolateInfo.colors[index];

          return ShapeComponent ? (
            <div
              key={index}
              onClick={() => handleChocolateClick(index)}
              onMouseDown={() => handleChocolatePress(index)}
              onTouchStart={() => handleChocolatePress(index)}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
              className="flex-shrink-0 cursor-pointer relative w-16 h-14"
              style={{
                pointerEvents: "none",
                WebkitTouchCallout: "none",
                TouchAction: "none",
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* 틀 */}
                <ShapeComponent
                  style={{
                    pointerEvents: "none",
                    WebkitTouchCallout: "none",
                    TouchAction: "none",
                  }}
                  strokeColor={
                    bottomNaviData.stage4[0].data.default.border
                  }
                  fillColor={
                    bottomNaviData.stage4[0].data.default.fill
                  }
                  width={64}
                  height={56}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* 실제 초콜릿 */}
                <ShapeComponent
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  strokeColor={
                    bottomNaviData.stage4[0].data[color].border
                  }
                  fillColor={
                    bottomNaviData.stage4[0].data[color].fill
                  }
                  width={
                    (64 * (chocolateInfo.sizes[index] || 0)) / 100
                  }
                  height={
                    (56 * (chocolateInfo.sizes[index] || 0)) / 100
                  }
                />
              </div>
            </div>
          ) : (
            console.warn(`${name} 컴포넌트 없음`) || null
          );
        })}
      </div>
    </div>
    <div
      className="w-[343px] h-96 bottom-[-20px] pastry-bag-area absolute"
      style={{ pointerEvents: "none" }}
    >
      <PastryBag
        fillColor={bottomNaviData.stage4[0].data[currentColor].fill}
        className={`${isPastryBagHidden ? "hidden" : ""}`} // 모든 초콜릿 채우면 숨김
        style={{
          position: "absolute",
          cursor: "grab",
          left: `${pastryBagPosition.x}px`,
          top: `${pastryBagPosition.y}px`,
          WebkitTouchCallout: "none",
          TouchAction: "none",
          pointerEvents: "auto",
          userSelect: "none",
        }}
        onClick={() => handleChocolateClick(currentChocolateIndex)}
        onMouseDown={() =>
          handleChocolatePress(currentChocolateIndex)
        }
        onTouchStart={() =>
          handleChocolatePress(currentChocolateIndex)
        }
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  </>
)}

{/* Stage 5 렌더링 */}
{stage.main === "stage5" && (
  <>
    {/* <div
      className={`transition-transform duration-300 ${isZoomMode ? "scale-[2] overflow-scroll" : ""} relative w-72 h-56`}
      ref */}
    <div
      className="relative w-72 h-56 transition-transform duration-300"
      ref={moldRef}
    >
      <Image
        src={box}
        alt="초콜릿 틀"
        width={280}
        height={280}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        style={{
          pointerEvents: "none",
          WebkitTouchCallout: "none",
          TouchAction: "none",
        }}
      />
      {/* 초콜릿들 */}
      <div className="w-full flex justify-center items-center flex-wrap absolute gap-x-2 gap-y-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {chocolateInfo.shapes.map((item, index) => {
          const name = item[0].toUpperCase() + item.slice(1);
          const ShapeComponent = Shapes[name];
          const color = chocolateInfo.colors[index];
          const isSelected = currentChocolateIndex === index;
          const isChocoPenMode = currentTabIndex === 0; 

          return ShapeComponent ? (
            <div
              key={index}
              onMouseOver={() => setCurrentChocolateIndex(index)}
              // onMouseLeave={() => setCurrentChocolateIndex(null)}
              onDragStart={(e) => e.preventDefault()}
              draggable={false}
              className={`flex-shrink-0 cursor-${isChocoPenMode ? 'chocopen' : currentTopping} relative w-[80px] h-[76px] bg-gray-warm-300 rounded-xl`}
              style={{
                WebkitTouchCallout: "none",
                TouchAction: "none",
              }}
            >
              <div
                className={`${
                  isZoomMode && isSelected ? "z-10" : ""
                } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <ShapeComponent
                  draggable={false}
                  className={
                    isZoomMode && isSelected
                      ? "scale-[2] transition duration-200 ease-in-out"
                      : ""
                  }
                  onDragStart={(e) => e.preventDefault()}
                  strokeColor={
                    bottomNaviData.stage4[0].data[color].border
                  }
                  fillColor={
                    bottomNaviData.stage4[0].data[color].fill
                  }
                  width={
                    (64 * (chocolateInfo.sizes[index] || 0)) / 100
                  }
                  height={
                    (56 * (chocolateInfo.sizes[index] || 0)) / 100
                  }
                />
              </div>
              <Canvas
                isSelected={isSelected}
                isZoomMode={isZoomMode}
                strokeColor={currentColor}
                onSave={handleSaveDrawing}
              />
            </div>
          ) : (
            console.warn(`${name} 컴포넌트 없음`) || null
          );
        })}
      </div>
    </div>
    {/* <ChocoPen
      className="absolute pointer-events-none "
      id="chocoPen"
      style={{
        transform: "translate(-50%, -90%)", // 중심을 아래쪽으로 맞춤
        left: "50%",
        top: "50%",
        opacity: 0,
      }}
    /> */}
  </>
)}

{/* Stage 6 렌더링 */}
{stage.main === "stage6" && (
  <div className="relative">
    {/* Stage6 관련 UI 추가 */}
    <p>Stage 6 Content</p>
  </div>
)}
</div>