import { useGameContext, addOpenCard } from "../../context/GameContext"

const CardLogo = ({ fruit, id }) => {
    const { addOpenCard, opened } = useGameContext()

    const handleClick = () => {

        return (opened.length < 2) ? addOpenCard({ id, fruit }) : false

    }

    return <div onClick={handleClick} >
        <img src="/oclock-logo.svg" width={100} height={100} />
    </div>
}

export default CardLogo