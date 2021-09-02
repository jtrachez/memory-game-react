import { createContext, useContext, useEffect, useReducer, useState } from "react";
import FRUITS from "../data/fruits";
const shuffle = array => array.sort(() => 0.5 - Math.random());

const GameContext = createContext();

const initialState = {
    cards: [],
    displayModalWin: false,
    displayModalLose: false,
    timerActive: false,
    timer: 5,
    opened: [],
    founded: []
}


const ADD_OPEN_CARD = 'ADD_OPEN_CARD'
const CLEAR_OPEN_CARDS = 'CLEAR_OPEN_CARDS'
const ADD_FOUND_FRUIT = 'ADD_FOUND_FRUIT'
const CLEAR_FOUND_FRUIT = 'CLEAR_FOUND_FRUIT'
const OPEN_MODAL_WIN = 'OPEN_MODAL_WIN'
const CLOSE_MODAL_WIN = 'CLOSE_MODAL_WIN'
const OPEN_MODAL_LOSE = 'OPEN_MODAL_LOSE'
const CLOSE_MODAL_LOSE = 'CLOSE_MODAL_LOSE'
const ACTIVATE_TIMER = 'ACTIVATE_TIMER'
const DEACTIVATE_TIMER = 'DEACTIVATE_TIMER'
const UPDATE_TIMER = 'UPDATE_TIMER'
const RESET_TIMER = 'RESET_TIMER'
const SET_CARDS = 'SET_CARDS'


const gameReducer = (state, action) => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: shuffle([...FRUITS, ...FRUITS])
            }
        case OPEN_MODAL_WIN:
            return {
                ...state,
                displayModalWin: true
            }
        case CLOSE_MODAL_WIN:
            return {
                ...state,
                displayModalWin: false
            }
        case OPEN_MODAL_LOSE:
            return {
                ...state,
                displayModalLose: true
            }
        case CLOSE_MODAL_LOSE:
            return {
                ...state,
                displayModalLose: false
            }
        case ACTIVATE_TIMER:
            return {
                ...state,
                timerActive: true
            }
        case DEACTIVATE_TIMER:
            return {
                ...state,
                timerActive: false
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
        case UPDATE_TIMER:
            return {
                ...state,
                timer: state.timer - 1
            }
        case RESET_TIMER:
            return {
                ...state,
                timer: initialState.timer
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

    const activateTimer = () => {
        return dispatch({ type: ACTIVATE_TIMER })
    }

    const deactivateTimer = () => {
        dispatch({ type: DEACTIVATE_TIMER })
    }


    const clearFounded = () => {
        return dispatch({ type: CLEAR_FOUND_FRUIT })
    }


    const clearOpened = () => {
        return dispatch({ type: CLEAR_OPEN_CARDS })
    }

    const closeModalWin = () => dispatch({ type: CLOSE_MODAL_WIN })

    const openModalLose = () => dispatch({ type: OPEN_MODAL_LOSE })
    const closeModalLose = () => dispatch({ type: CLOSE_MODAL_LOSE })

    const updateTimer = () => dispatch({ type: UPDATE_TIMER })
    const resetTimer = () => dispatch({ type: RESET_TIMER })

    const setCards = () => dispatch({ type: SET_CARDS })


    const checkDoubleCardClicked = () => {
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

    const checkWinGame = () => {
        if (state.founded.length == FRUITS.length) {
            console.log('win game complete')
            deactivateTimer()
            setTimeout(() => dispatch({ type: OPEN_MODAL_WIN }), 500)
        }
    }

    useEffect(() => {
        setCards()
    }, [])

    useEffect(() => {
        checkDoubleCardClicked()
    })

    useEffect(() => {
        checkWinGame()
    }, [state.founded])


    const value = {
        ...state,
        addOpenCard,
        closeModalWin,
        activateTimer,
        deactivateTimer,
        clearFounded,
        clearOpened,
        openModalLose,
        closeModalLose,
        updateTimer,
        resetTimer,
        setCards
    }


    return <GameContext.Provider value={value} {...props} />
}

// Custom hook pour récuperer le contexte du jeu
function useGameContext() {
    return useContext(GameContext);
}


export { GameProvider, useGameContext };

