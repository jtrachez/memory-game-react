import { Dialog } from "@headlessui/react"
import { useGameContext } from "../../context/GameContext"



const ModalStartGame = () => {

    const { displayModalStart, closeModalStart, players } = useGameContext()

    return (
        <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={displayModalStart} onClose={() => false}>
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                    <Dialog.Title className="text-2xl font-bold justify-center flex">Memory O'Clock</Dialog.Title>
                    <Dialog.Description className="mt-2 justify-center flex my-4">
                        Les Meilleures Scores
                    </Dialog.Description>

                    <ul className="flex flex-col items-center justify-center">
                        {players.map((player, id) => <li key={player.name} className="text-lg"><strong> {id + 1}# {player.name}</strong> <span className="text-sm text-gray-500">{player.score} secondes</span></li>)}
                    </ul>

                    <div className="mt-5 flex justify-center">
                        <button className="p-4 bg-yellow-300 font-bold rounded-md text-xl uppercase" onClick={() => closeModalStart()}>Commencer</button>
                        {/* <button className="p-2 bg-yellow-300 font-bold rounded-md" onClick={() => closeModalStart()}>Close</button> */}
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default ModalStartGame