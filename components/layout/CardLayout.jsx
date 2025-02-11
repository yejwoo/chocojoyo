import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import box from "@/public/images/stage5/box.svg";
import Button from "../Button";
import Image from "next/image";
import { bgBrown } from "@/public/images/common";
import { supabase } from "@/lib/supabaseClient";
import Container from "./Container";
import { useRouter } from "next/navigation";
import Chocolates from "../Chocolates";
import CustomLoading from "../CustomLoading";

const CardLayout = forwardRef(({ chocolateInfo, mode = "write", initialData, id, onOpen, onComplete, onDownload, isReceiver, isBoxOpened }, ref) => {
  const cardRef = useRef(null);
  const boxRef = useRef(null);
  const chocoRefs = useRef([]);
  const router = useRouter();

  const [formData, setFormData] = useState(initialData || { message: "", name: "", shapes: [], toppings: [], drawings: [] });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chocolateInfoRef = useRef(chocolateInfo);
  const MAX_LENTH = 60;

  useEffect(() => {
    chocolateInfoRef.current = chocolateInfo;
  }, [chocolateInfo]);

  useEffect(() => {
    setIsCompleted(formData.message.length > 0 && formData.name.length > 0);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") {
      const lines = value.split("\n");
      if (lines.length > 3) return;
      setFormData({ ...formData, message: value.slice(0, MAX_LENTH) });
    } else if (name === "name") {
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

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 제출 방지
    setIsSubmitting(true);
    await onComplete(formData);
    setIsSubmitting(false);
  };

  const showCompleteButton = mode === "write";

  return (
    <Container>
      {isSubmitting ? (
        <CustomLoading />
      ) : (
        <>
          <div ref={cardRef} className="w-full h-full relative flex flex-col items-center justify-between">
            <Image src={bgBrown} alt="배경화면" className="absolute bottom-0 choco-bg" draggable={false} />
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-4 w-[320px] max-h-sm:top-5 max-h-sm:translate-y-0">
              <div className={` ${isBoxOpened ? "animate-bounce-up-once-slow" : ""} border-4 border-box-200 bg-box-100 rounded-lg p-3`}>
                <div className="w-full flex flex-col py-4 bg-box-100 rounded-lg text-white h-[176px]">
                  {mode === "write" ? (
                    <>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-[280px] mx-auto h-[108px] text-2xl leading-9 flex p-2 border-none bg-transparent outline-none resize-none border-b border-gray-warm-100"
                        placeholder="편지는 3줄까지 쓸 수 있어요."
                        maxLength={60}
                      />
                      <div className="mt-2 pl-2 relative">
                        <span className="text-lg">From. </span>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="text-left w-[130px] bg-transparent outline-none"
                          type="text"
                          placeholder="최대 10글자"
                          maxLength={10}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {formData.message.trim() && (
                        <p className="w-[280px] mx-auto h-[108px] text-left text-2xl leading-9 flex text-white whitespace-pre-line">{formData.message}</p>
                      )}
                      {formData.name.trim() && (
                        <div className="mt-2 relative">
                          <span className="text-lg relative z-10 pl-2">From. </span>
                          <span className="relative z-10">{formData.name}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="w-full pt-4 flex justify-center items-center border-t-2 border-t-box-200">
                  <div ref={boxRef} className="relative z-10 w-[280px] h-[182px] flex justify-center items-center rounded-lg">
                    <Image src={box} alt="초콜릿 틀" width={280} height={182} className="absolute" draggable={false} />
                    <div className="w-full flex justify-center items-center flex-wrap gap-x-2 gap-y-2 max-w-full max-h-full">
                      <Chocolates chocolateInfo={chocolateInfo} showDrawings={true} chocoRefs={chocoRefs} mode={mode} />
                    </div>
                  </div>
                </div>
              </div>

              {showCompleteButton ? (
                <Button size="md" onClick={handleSubmit} disabled={!isCompleted} message="완성" />
              ) : (
                <div className="flex justify-center no-capture">
                  <Button
                    size="full"
                    color="main"
                    message={isReceiver ? "달콤한 추억 간직하기" : "공유하기"}
                    onClick={() => (isReceiver ? onDownload() : onOpen("share"))}
                  />
                </div>
              )}
            </div>
          </div>
          {mode === "share" && !isReceiver && (
            <div className="absolute right-6 bottom-6 max-h-sm:bottom-2 no-capture">
              <Button type="replay" shape="circle" color="brand" onClick={() => router.push("/")} />
            </div>
          )}
        </>
      )}
    </Container>
  );
});

export default CardLayout;
