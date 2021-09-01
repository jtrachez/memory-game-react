import { createContext, useContext, useEffect, useReducer } from "react";

const GameContext = createContext();

const initialState = {
    displayWinModal: false,
    opened: [],
    founded: []
}


const ADD_OPEN_CARD = 'ADD_OPEN_CARD'
const CLEAR_OPEN_CARDS = 'CLEAR_OPEN_CARDS'
const ADD_FOUND_FRUIT = 'ADD_FOUND_FRUIT'
const CLEAR_FOUND_FRUIT = 'CLEAR_FOUND_FRUIT'
const OPEN_WIN_MODAL = 'OPEN_WIN_MODAL'
const CLOSE_WIN_MODAL = 'CLOSE_WIN_MODAL'


const gameReducer = (state, action) => {
    switch (action.type) {
        case OPEN_WIN_MODAL:
            return {
                ...state,
                displayWinModal: true
            }
        case CLOSE_WIN_MODAL:
            return {
                ...state,
                displayWinModal: false
            }
        case ADD_OPEN_CARD:

            return {
                ...state,
                opened: [...state.opened, action.payload]
            }
        case CLEAR_OPEN_CARDS:
            return {
                ...state,
                opened: []
            }
        case ADD_FOUND_FRUIT:
            return {
                ...state,
                founded: [...state.founded, action.payload]
            }
        case CLEAR_FOUND_FRUIT:
            return {
                ...state,
                founded: []
            }
        default:
            return state;
    }
}




const GameProvider = (props) => {

    const [state, dispatch] = useReducer(gameReducer, initialState)

    const addOpenCard = (payload) => {
        return dispatch({ type: ADD_OPEN_CARD, payload })
    }

    const addFoundFruit = (payload) => {
        return dispatch({ type: ADD_FOUND_FRUIT, payload })
    }


    const checkDoubleCardClicked = () => {
        console.log('called')
        if (state.opened.length >= 2) {

            const clickedCardOne = state.opened[0].fruit
            const clickedCardTwo = state.opened[1].fruit

            if (clickedCardOne == clickedCardTwo) {
                // reset open cards array
                dispatch({ type: CLEAR_OPEN_CARDS })
                // add fruit to win array
                addFoundFruit(clickedCardOne)
            } else {
                setTimeout(() => {
                    dispatch({ type: CLEAR_OPEN_CARDS })
                }, 1000)
            }

        }
    }


    useEffect(() => {
        checkDoubleCardClicked()
        if (state.founded.length == 18) {
            console.log('win game complete')
            dispatch({ type: OPEN_WIN_MODAL })
        }
    })




    const value = {
        ...state,
        addOpenCard,
    }


    return <GameContext.Provider value={value} {...props} />
}

// Custom hook pour récuperer le contexte du jeu
function useGameContext() {
    return useContext(GameContext);
}


export { GameProvider, useGameContext };

