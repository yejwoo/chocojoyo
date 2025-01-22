import Image from "next/image";
import { 
    naviStage1Off, naviStage1On, 
    naviStage2Off, naviStage2On, 
    naviStage3Off, naviStage3On, 
    naviStage4Off, naviStage4On, 
    naviStage5Off, naviStage5On, 
    naviStage6Off, naviStage6On, 
    checkSm 
} from "@/public/images/common";

const stages = [
    { id: 1, off: naviStage1Off, on: naviStage1On },
    { id: 2, off: naviStage2Off, on: naviStage2On },
    { id: 3, off: naviStage3Off, on: naviStage3On },
    { id: 4, off: naviStage4Off, on: naviStage4On },
    { id: 5, off: naviStage5Off, on: naviStage5On },
    { id: 6, off: naviStage6Off, on: naviStage6On },
];

export default function Navi({ currentStage, completedStages }) {
    return (
        <nav className="fixed left-0 right-0 top-6">
            <ul className="flex items-center justify-center gap-4">
                {stages.map((stage) => (
                    <li 
                        key={stage.id} 
                        className={`stage${stage.id} relative w-10 h-10 flex-shrink-0`}
                    >
                        {/* Off 상태 */}
                        <Image 
                            src={stage.off} 
                            alt={`${stage.id}단계`} 
                            className={`${currentStage === stage.id ? "hidden" : ""}`} 
                        />
                        {/* On 상태 */}
                        <Image 
                            src={stage.on} 
                            alt={`${stage.id}단계`} 
                            className={`${currentStage === stage.id ? "" : "hidden"}`} 
                        />
                        {/* 완료 체크 */}
                        <Image 
                            src={checkSm} 
                            alt="완료" 
                            className={`${completedStages.includes(stage.id) ? "" : "hidden"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} 
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
