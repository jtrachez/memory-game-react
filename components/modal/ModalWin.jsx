import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { post } from "../../lib/utils"
import config from './../../config/config'

const ModalWin = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { displayModalWin, closeModalWin, playTime } = useGameContext()
    let score = (config.TIMING - playTime)

    const submitForm = async (e) => {

        setLoading(true)
        try {
            await post('/api/players/create', { name, score })
            setMessage('Votre score est sauvegardé')
            setSubmitted(true)

        } catch (error) {
            console.log(error)
            setMessage('Une erreur est survenue !')
            setLoading(false)
            setSubmitted(false)

        }
        setLoading(false)

    }

    const onCloseModal = () => {
        closeModalWin()
        setMessage('')
        setSubmitted(false)

    }

    return (
        <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={displayModalWin} onClose={() => { }}>
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                    <Dialog.Title className="text-xl font-bold">Félicitation ! Vous avez gagné !</Dialog.Title>
                    <Dialog.Description className="mt-2">
                        👍 Vous avez fini en <strong>{config.TIMING - playTime} secondes</strong> <br />
                        Entrez votre nom pour figurer parmis les meilleurs
                    </Dialog.Description>

                    {!submitted && <div className="flex mt-6">
                        <form className="flex-1" onSubmit={() => submitForm()}>
                            <label htmlFor="name" className="text-gray-600 text-sm">

                                <input className="w-10/12 text-sm rounded-sm border p-2" id="name" type="text" name="name" onChange={(e) => { setName(e.target.value) }} />

                            </label>

                        </form>
                        <div className="flex-1">
                            <button className="flex justify-center w-full p-2 bg-yellow-300 font-bold rounded-md mb-5" onClick={() => submitForm()}>

                                {loading ? <div className=" animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" >

                                </div> : ' Enregistrer mon score'}
                            </button>

                        </div>
                    </div>}
                    <div className="font-bold text-green">{message}</div>

                    <div className="mt-5">
                        <button className="w-full p-2 bg-black text-white font-bold rounded-md" onClick={() => onCloseModal()}>
                            Fermer
                        </button>
                    </div>


                </div>
            </div>

        </Dialog>
    )
}

export default ModalWin