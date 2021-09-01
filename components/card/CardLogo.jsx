import { useGameContext, addOpenCard } from "../../context/GameContext"

const CardLogo = ({ fruit, id }) => {
    const { addOpenCard } = useGameContext()

    const handleClick = () => {
        addOpenCard({ id, fruit })
    }

    return <div onClick={handleClick} >
        <img src="/oclock-logo.svg" width={100} height={100} />
    </div>
}

export default CardLogo