import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import box from "@/public/images/stage5/box.svg";
import { Shapes } from "@/public/icons/shapes";
import Button from "../Button";
import Image from "next/image";
import { bottomNaviConfig } from "@/data/Stage";
import { bgBrown } from "@/public/images/common";
import { supabase } from "@/lib/supabaseClient";

const CardLayout = forwardRef(({ chocolateInfo, mode = "write", initialData, id, onOpen }, ref) => {
  const cardRef = useRef(null);
  const boxRef = useRef(null);
  const chocoRefs = useRef([]);

  const [formData, setFormData] = useState(initialData || { message: "", name: "", shapes: [], toppings: [], drawings: [] });
  const [isCompleted, setIsCompleted] = useState(false);
  const chocolateInfoRef = useRef(chocolateInfo);
  const MAX_LENTH = 60;
  const chocolateColors = bottomNaviConfig[4][0].data;

  useEffect(() => {
    chocolateInfoRef.current = chocolateInfo;
  }, [chocolateInfo]);

  useEffect(() => {
    setIsCompleted(formData.message.length > 0 && formData.name.length > 0);
  }, [formData]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "message") {
      const lines = value.split("\n");
      if (lines.length > 3) return;
      setFormData({ ...formData, message: value.slice(0, MAX_LENTH) });
    } else {
      setFormData({ ...formData, name: value });
    }
  };

  useEffect(() => {
    if (mode === "share" && id) {
      const fetchCardData = async () => {
        const { data, error } = await supabase.from("cards").select("*").eq("id", id).single();
        if (error) {
          console.error("Error fetching card:", error);
        } else {
          setFormData(data);
        }
      };
      fetchCardData();
    }
  }, [mode, id]);

  useImperativeHandle(ref, () => ({
    getCardElement: () => cardRef.current,
    getBoxElement: () => boxRef.current,
    getChocoElements: () => chocoRefs.current,
  }));

  const showCompleteButton = mode === "write";

  return (
    <main
      ref={cardRef}
      className="max-w-[400px] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-between"
    >
      <Image src={bgBrown} alt="배경화면" className="absolute bottom-0" draggable={false} />
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[320px] max-h-sm:top-5 max-h-sm:translate-y-0">
        <div className="shadow-lg bg-white rounded-lg">
          <div className="w-full py-5">
            <div ref={boxRef} className="relative z-10 w-[280px] h-[182px] flex justify-center items-center mx-auto">
              <Image src={box} alt="초콜릿 틀" width={280} height={280} className="absolute bottom-0" draggable={false} />
              <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2">
                {formData.shapes.map((shape, index) => {
                  const ShapeComponent = Shapes[shape.charAt(0).toUpperCase() + shape.slice(1)];
                  const drawing = formData.drawings[index];
                  const topping = formData.toppings[index];
                  const color = formData.colors[index];

                  return ShapeComponent ? (
                    <div
                      key={index}
                      ref={(el) => (chocoRefs.current[index] = el)}
                      className="relative w-[80px] h-[76px] rounded-xl flex items-center justify-center"
                    >
                      {/* 저장 시 숨길 배경 */}
                      <div className="choco-bg absolute inset-0 bg-gray-warm-300 rounded-xl z-0" />

                      {/* 초콜릿 기본 형태 */}
                      <ShapeComponent
                        width={64}
                        height={56}
                        fillColor={chocolateColors[color]?.fill}
                        strokeColor={chocolateColors[color]?.border}
                        className="relative z-10"
                      />

                      {/* 🖌️ 드로잉 */}
                      {drawing && <canvas className="absolute z-20" width={64} height={56} style={{ background: `url(${drawing}) no-repeat center/cover` }} />}

                      {/* 🍓 토핑 (가운데 정렬) */}
                      {topping && (
                        <Image
                          className="absolute z-30"
                          src={`/images/stage5/toppings/topping-${topping}.svg`}
                          alt="토핑"
                          width={32}
                          height={32}
                          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                        />
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {mode === "write" ? (
            <div className="w-full flex flex-col justify-center items-center pb-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-[280px] mx-auto h-[108px] text-left text-2xl leading-9 flex"
                placeholder="편지는 세 줄까지 쓸 수 있어요."
              />
              <div className="mt-2 relative text-center border-b border-gray-warm-100">
                <span className="text-lg">from. </span>
                <input
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-left"
                  type="text"
                  placeholder="이름은 열 글자까지"
                  maxLength={10}
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center pb-4">
              <p className="w-[280px] mx-auto h-[108px] text-left text-2xl leading-9 flex whitespace-pre-line">{formData.message}</p>
              <div className="mt-2 relative text-center border-b border-gray-warm-100">
                <span className="text-lg">from. </span>
                <span>{formData.name}</span>
              </div>
            </div>
          )}
        </div>

        {showCompleteButton ? (
          <Button size="md" onClick={() => isCompleted && onComplete(formData)} disabled={!isCompleted} message="완성" />
        ) : (
          <div className="flex gap-2 justify-center no-capture">
            <Button size="half" color="main" message={"공유하기"} onClick={() => onOpen("share")} />
            <Button size="half" color="main" message={"사진 저장"} onClick={() => onOpen("download")} />
          </div>
        )}
      </div>
    </main>
  );
});

export default CardLayout;
