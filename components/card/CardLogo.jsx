import { useGameContext } from "../../context/GameContext"
import Image from 'next/image'

const CardLogo = ({ fruit, id }) => {
    const { addOpenCard, opened } = useGameContext()

    const handleClick = () => (opened.length < 2) ? addOpenCard({ id, fruit }) : false

    return <div onClick={handleClick} className="flex items-center justify-center" >
        <Image src="/oclock-logo.svg" width={100} height={100} alt="Memory O'Clock" />
    </div>
}

export default CardLogo