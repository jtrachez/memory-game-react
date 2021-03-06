import { Dialog } from "@headlessui/react"
import { useGameContext } from "../../context/GameContext"

const ModalLose = () => {

    const { displayModalLose, closeModalLose } = useGameContext()

    return (
        <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={displayModalLose} onClose={() => closeModalLose()}>
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                    <Dialog.Title className="flex justify-center text-xl font-bold">Ohh vous avez perdu !</Dialog.Title>


                    <div className=" flex justify-center mt-5">
                        <button className="p-2 bg-yellow-300 font-bold rounded-md" onClick={() => closeModalLose()}>Fermer & Recommencer</button>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default ModalLose