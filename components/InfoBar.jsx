import { useGameContext } from "../context/GameContext"
const TIMING = 5
const InfoBar = () => {
    const { timer } = useGameContext()
    return (
        <div className="flex border rounded-md p-5 my-5 items-center">
            <div className="flex flex-col flex-1 p-2">
                <div> TEMPS RESTANT : {timer}</div>
                <div>
                    <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 absolute"></div>
                        <div className="h-full bg-green-500 absolute" style={{ width: `${timer * 100 / TIMING}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-2"></div>
        </div>
    )
}

export default InfoBar