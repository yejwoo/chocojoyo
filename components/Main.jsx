import Image from "next/image"
import Button from "./Button"
import { logo, yanto, bg } from "@/public/images/main"

export default function Main({onStart}) {
    return (
        <main className={`bg-white max-w-[400] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <div className="absolute w-full h-full">
                {/* <Image src={bg} fill objectFit="cover" alt="다음" />             */}
                <div className="bg-chocolates-ruby-100 w-full h-full"></div>
                <Image src={logo} className="absolute w-[360px] top-28 left-1/2 -translate-x-1/2" alt="로고" />
                {/* <Image src={yanto} className="absolute top-[45%] left-1/2 animate-bounce-up" alt="얀토" /> */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%]">
                    <Button message={"시작해요"} onClick={onStart}/>
                </div>
            </div>
        </main>
    )
} 