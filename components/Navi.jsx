import Image from "next/image"
import { naviStage1Off, naviStage1On, naviStage2Off, naviStage2On, naviStage3Off, naviStage3On, naviStage4Off, naviStage4On,
naviStage5Off, naviStage5On, naviStage6Off, naviStage6On, checkSm } from "@/public/images/common"

export default function Navi() {
    return (
        <nav className="fixed left-0 right-0 top-6">
            <ul className="flex items-center justify-center gap-4">
                {/* 단계 완료될 때마다 hideen 클래스 탈부착 */}
                <li className="stage1 relative w-10 h-10 flex-shrink-0">
                    <Image className="" src={naviStage1Off} alt="1단계" />
                    <Image className="absolute top-0" src={naviStage1On} alt="1단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
                <li className="stage2 relative w-10 h-10 flex-shrink-0">
                    <Image className="" src={naviStage2Off} alt="2단계" />
                    <Image className="hidden absolute top-0" src={naviStage2On} alt="2단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
                <li className="stage3 relative w-10 h-10 flex-shrink-0">
                    <Image className="" src={naviStage3Off} alt="3단계" />
                    <Image className="hidden absolute top-0" src={naviStage3On} alt="3단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
                <li className="stage4 relative w-9 h-10 flex-shrink-0">
                    <Image className="" src={naviStage4Off} alt="4단계" />
                    <Image className="hidden absolute top-0" src={naviStage4On} alt="4단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
                <li className="stage5 relative w-10 h-10 flex-shrink-0">
                    <Image className="" src={naviStage5Off} alt="5단계" />
                    <Image className="hidden absolute top-0" src={naviStage5On} alt="5단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
                <li className="stage6 relative w-10 h-10 flex-shrink-0">
                    <Image className="" src={naviStage6Off} alt="6단계" />
                    <Image className="hidden absolute top-0" src={naviStage6On} alt="6단계" />
                    <Image className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={checkSm} alt="완료" />
                </li>
            </ul>
        </nav>
    )
} 