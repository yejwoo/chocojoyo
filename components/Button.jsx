import Image from "next/image";

export default function Button({ shape = "rectangle", message, color = "main", type = "arrow", size = "default", onClick, disabled = false}) {
  const buttonShape = shape === "circle" ? "w-16 rounded-full" : "rounded-lg overflow-hidden";
  const buttonSizes = {
    half: "w-1/2",
    full: "w-full",
    default: "min-w-48",
    md: "w-[343px]",
    sm: "w-24"
  };
  const buttonColors = {
    main: "bg-brand-100",
    secondary: "bg-chocolates-ruby-100",
    tertiary: "bg-gray-cool-50",
    brown: "bg-chocolates-milk-100"
  };
  const buttonShadowColors = {
    main: "bg-brand-200",
    secondary: "bg-chocolates-ruby-200",
    tertiary: "bg-gray-cool-100",
  };
  const buttonIcons = {
    arrow: <Image src="/icons/buttons/arrow.svg" width={32} height={32} alt="다음" />,
    close: <Image src="/icons/buttons/close.svg" width={32} height={32} alt="닫기" />,
  };
  const disalbedStyle = {
    circle: "disabled:bg-gray-cool-50 disabled:cursor-not-allowed",
    rectangle: "disabled:bg-gray-cool-50 disabled:cursor-not-allowed",
  };
  const isShapeRect = shape === "rectangle";
  const isShapeCircle = shape === "circle";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${color in buttonColors ? buttonColors[color] : buttonColors.main} ${buttonShape}
      ${isShapeRect && size in buttonSizes && buttonSizes[size]} text-3xl border-4 border-default focus:scale-95 
      ${disabled && isShapeRect && disalbedStyle.rectangle}
      ${disabled && isShapeCircle && disalbedStyle.circle}
      
      `}
    >
      {isShapeCircle && (
        <div className="h-14 flex-shrink-0 flex justify-center items-center">{type in buttonIcons ? buttonIcons[type] : buttonIcons.arrow}</div>
      )}
      {isShapeRect && (
        <>
          <p className="h-12 flex justify-center items-center">{message}</p>
          <div
            className={`${disabled ? "bg-gray-cool-100" : color in buttonShadowColors ? buttonShadowColors[color] : buttonShadowColors.main} w-full h-2`}
          ></div>
        </>
      )}
    </button>
  );
}
