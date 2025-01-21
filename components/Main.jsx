import Image from "next/image"
import Button from "./Button"

export default function Main() {
    return (
        <main className="bg-white xs:border xs:border-default max-w-[400] max-h-[800px] fixed w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-full h-full">
                <Image src="/images/main/bg.png" fill objectFit="cover" alt="다음" />            
                <Image src="/images/main/logo.png" className="absolute top-28 left-1/2 -translate-x-1/2" width={"300"} height={"300"} alt="로고" />
                <Image src="/images/main/yanto.png" className="absolute top-[45%] left-1/2 animate-bounce-up" width={"160"} height={"160"} alt="얀토" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%]">
                    <Button message={"시작해요"}/>
                </div>
            </div>
        </main>
    )
} 