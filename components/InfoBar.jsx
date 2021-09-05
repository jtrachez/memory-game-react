import { useGameContext } from "../context/GameContext"
import config from './../config/config'

const InfoBar = () => {
    const { timer, resetGame } = useGameContext()
    const onRestartGame = () => resetGame()
    return (
        <div className="flex rounded-md p-5 my-5 items-center">
            <div className="flex flex-col flex-1 p-2">
                <div className="font-bold"> TEMPS RESTANT : {timer}s</div>
                <div>
                    <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                        <div className="w-full h-full bg-black absolute"></div>
                        <div className="h-full bg-yellow-400 absolute" style={{ width: `${timer * 100 / config.TIMING}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 p-2  justify-end">
                <button className="p-3 bg-black text-yellow-300 font-bold rounded" onClick={() => onRestartGame()}>RECOMMENCER</button>
            </div>
        </div>
    )
}

export default InfoBar