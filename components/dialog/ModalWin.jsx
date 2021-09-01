import { Dialog } from "@headlessui/react"
import { useGameContext } from "../../context/GameContext"

const ModalWin = () => {

    const { displayModalWin, closeModalWin } = useGameContext()

    return (
        <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={displayModalWin} onClose={() => { }}>
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                    <Dialog.Title className="text-xl font-bold">Félicitation ! Vous avez gagné !</Dialog.Title>
                    <Dialog.Description className="mt-2">
                        This will permanently deactivate your account
                    </Dialog.Description>

                    <div>
                        <button onClick={() => closeModalWin()}>Close</button>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default ModalWin