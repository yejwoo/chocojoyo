import Image from "next/image";

export const BottomNaviItem = ({ naviData }) => {
  switch (naviData.type) {
    case "color":
      return Object.keys(naviData.data)
        .filter((item) => item !== "default")
        .map((item, subIndex) => (
          <div
            key={subIndex}
            className="cursor-pointer flex-shrink-0 rounded-full border-2 w-8 h-8"
            style={{
              backgroundColor: naviData.data[item].fill,
              borderColor: naviData.data[item].border,
            }}
          ></div>
        ));
    case "image":
      return (
        <div className="flex gap-7">
          {naviData.data.map((item, subIndex) => (
            <Image key={subIndex} src={item.imgSrc} alt={item.alt || "토핑 이미지"} />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export const BottomNavi = ({ stage }) => {
    return (
      <div className="fixed h-[104px] bottom-0 left-0 right-0">
        <div className="absolute bg-popup-100 left-0 right-0 h-16 bottom-0 flex gap-7 justify-center items-center">
          {bottomNaviData[stage.main].map((naviData, index) => (
            <BottomNaviItem key={index} naviData={naviData} />
          ))}
        </div>
      </div>
    );
  };