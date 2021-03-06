import { useEffect, useState } from "react"
import ReactFlipCard from "react-card-flip"
import { useGameContext } from "../../context/GameContext"
import CardFruit from "./CardFruit"
import CardLogo from "./CardLogo"

const Card = ({ fruit, id }) => {
    const [flip, setFlip] = useState(false)

    const { opened, founded } = useGameContext()

    useEffect(() => {
        const card = opened.filter(card => card.fruit == fruit && card.id === id)
        setFlip(card.length > 0 || founded.includes(fruit) ? true : false)
    }, [opened, founded, fruit, id])

    return (
        <div style={{ width: '100px', height: '100px' }} className="align-self-center justify-self-center">
            <ReactFlipCard isFlipped={flip} >
                <CardLogo id={id} fruit={fruit} />
                <CardFruit fruit={fruit} />
            </ReactFlipCard>
            {/* {fruit} */}
        </div>
    )
}

export default Card