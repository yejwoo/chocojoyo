"use client";
import Button from "@/components/Button";
import { notFound } from "@/public/images/common";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="max-w-[400px] flex flex-col mx-auto justify-center items-center w-full h-full">
      <div className="flex flex-col gap-12 justify-center ">
        <div className="flex flex-col gap-3 items-center justify-center">
          <Image className="mx-auto" src={notFound} width={120} height={120} alt="not found" />
          <p className="cafe24-surround text-3xl">404 Not Found</p>
          <p className="text-lg text-center">찾으시는 페이지가 녹아버린 것 같아요.<br/>걱정 마세요! 달콤한 홈으로 안내해드릴게요. </p>
        </div>
        <Button size="md" message={"홈으로 이동"} onClick={() => router.push("/")} />
      </div>
    </main>
  );
}
