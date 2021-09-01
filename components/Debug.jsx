import { useGameContext } from "../context/GameContext"

const Debug = () => {
    const { founded, opened } = useGameContext()
    return (<div>
        <div>
            debug opened card:
            <ul>
                {opened.map((card, idx) => <li key={idx}>{card.fruit}</li>)}
            </ul>
        </div>
        <div>
            debug wins fruits
            <ul>
                {founded.map((fruit, idx) => <li key={idx}>{fruit}</li>)}
            </ul>
        </div>
    </div >)
}

export default Debug