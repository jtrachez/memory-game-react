import { useGameContext } from "../context/GameContext"
import config from './../config/config'

const InfoBar = () => {
    const { timer } = useGameContext()
    return (
        <div className="flex border rounded-md p-5 my-5 items-center">
            <div className="flex flex-col flex-1 p-2">
                <div className="font-bold"> TEMPS RESTANT : {timer}</div>
                <div>
                    <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 absolute"></div>
                        <div className="h-full bg-green-500 absolute" style={{ width: `${timer * 100 / config.TIMING}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoBar