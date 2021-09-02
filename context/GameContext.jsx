import { createContext, useContext, useEffect, useReducer, useState } from "react";
import FRUITS from "../data/fruits";
const shuffle = array => array.sort(() => 0.5 - Math.random());
import config from '../config/config'
const GameContext = createContext();


const initialState = {
    cards: [],
    displayModalWin: false,
    displayModalLose: false,
    displayModalStart: true,
    timerActive: false,
    timer: config.TIMING,
    opened: [],
    founded: [],
    playTime: 0,
    players: [
        { name: "Julo", score: 3 },
        { name: "Sophie", score: 5 },
        { name: "Paddy", score: 20 },
        { name: "Eden", score: 10 },
    ]
}



const ADD_OPEN_CARD = 'ADD_OPEN_CARD'
const CLEAR_OPEN_CARDS = 'CLEAR_OPEN_CARDS'
const ADD_FOUND_FRUIT = 'ADD_FOUND_FRUIT'
const CLEAR_FOUND_FRUIT = 'CLEAR_FOUND_FRUIT'
const OPEN_MODAL_WIN = 'OPEN_MODAL_WIN'
const CLOSE_MODAL_WIN = 'CLOSE_MODAL_WIN'
const OPEN_MODAL_LOSE = 'OPEN_MODAL_LOSE'
const CLOSE_MODAL_LOSE = 'CLOSE_MODAL_LOSE'
const OPEN_MODAL_START = 'OPEN_MODAL_START'
const CLOSE_MODAL_START = 'CLOSE_MODAL_START'
const ACTIVATE_TIMER = 'ACTIVATE_TIMER'
const DEACTIVATE_TIMER = 'DEACTIVATE_TIMER'
const UPDATE_TIMER = 'UPDATE_TIMER'
const RESET_TIMER = 'RESET_TIMER'
const SET_CARDS = 'SET_CARDS'
const SET_PLAYTIME = 'SET_PLAYTIME'


const gameReducer = (state, action) => {
    switch (action.type) {
        case SET_PLAYERS:
            return {
                ...state,
                players: action.payload
            }
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
        case OPEN_MODAL_START:
            return {
                ...state,
                displayModalStart: true
            }
        case CLOSE_MODAL_START:
            return {
                ...state,
                displayModalStart: false
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
        case SET_PLAYTIME:
            return {
                ...state,
                playTime: action.payload
            }
        default:
            return state;
    }
}

const GameProvider = (props) => {

    const [state, dispatch] = useReducer(gameReducer, initialState)


    const setPlayers = (payload) => dispatch({ type: SET_PLAYERS, payload })

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

    const updateTimer = () => dispatch({ type: UPDATE_TIMER })
    const resetTimer = () => dispatch({ type: RESET_TIMER })

    const setCards = () => dispatch({ type: SET_CARDS })
    const setPlayTime = (payload) => dispatch({ type: SET_PLAYTIME, payload })


    // @todo gestion des vues pour les modals (ex: setViewModal(WIN))
    const openModalWin = () => dispatch({ type: OPEN_MODAL_WIN })
    const closeModalWin = () => dispatch({ type: CLOSE_MODAL_WIN })

    const openModalLose = () => dispatch({ type: OPEN_MODAL_LOSE })
    const closeModalLose = () => dispatch({ type: CLOSE_MODAL_LOSE })

    const openModalStart = () => dispatch({ type: OPEN_MODAL_START })
    const closeModalStart = () => dispatch({ type: CLOSE_MODAL_START })


    const resetGame = () => {
        clearOpened()
        clearFounded()
        setCards()
        resetTimer()
    }


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
                }, 500)
            }

        }
    }

    const checkWinGame = () => {
        if (state.founded.length == FRUITS.length) {
            console.log('win game complete')
            deactivateTimer()
            console.log(state.timer)
            setPlayTime(state.timer)
            setTimeout(() => {
                openModalWin()
                resetGame()
            }, 500)
        }
    }


    // Effect for start timer countdown
    useEffect(() => {
        if (state.timerActive) {
            const intervalId = setInterval(() => updateTimer(), 1000)
            if (state.timer == 0) {

                deactivateTimer()
                openModalLose()
                resetGame()
            }
            return () => clearInterval(intervalId)
        }

    }, [state.timer, state.timerActive])


    // effect on first rendered only
    useEffect(async () => {
        setCards()
    }, [])

    // Effect for check DoubleClikedCard
    useEffect(() => {
        checkDoubleCardClicked()
    })

    // Effect for check if win game
    useEffect(() => {
        checkWinGame()
    }, [state.founded])


    // @todo utiliser useMemo pour optimiser ?
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
        setCards,
        resetGame,
        openModalStart,
        closeModalStart
    }


    return <GameContext.Provider value={value} {...props} />
}

// Custom hook pour récuperer le contexte du jeu
function useGameContext() {
    return useContext(GameContext);
}


export { GameProvider, useGameContext };

