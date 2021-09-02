import Head from 'next/head'
import { useEffect, useState } from 'react';
import Card from '../components/card/Card';
import Debug from '../components/Debug';
import InfoBar from '../components/InfoBar';
import ModalLose from '../components/modal/ModalLose';
import ModalWin from '../components/modal/ModalWin';
import { useGameContext } from '../context/GameContext';
import { shuffle } from '../lib/utils';

import FRUITS from '../data/fruits'
const TIMING = 5


export default function Home() {
  const { setCards, cards, founded, resetTimer, updateTimer, timer, timerActive, activateTimer, deactivateTimer, clearOpened, clearFounded, openModalLose } = useGameContext()


  useEffect(() => {
    if (timerActive) {
      const intervalId = setInterval(() => updateTimer(), 1000)
      if (timer == 0) {

        deactivateTimer()
        clearFounded()
        clearOpened()
        openModalLose()

        // reset timer & shuffle cards again for start new game
        // setCards([...shuffle(FRUITS), ...shuffle(FRUITS)])
        setCards()
        resetTimer()

      }
      return () => clearInterval(intervalId)
    }

  }, [timer, timerActive])

  return (
    <>
      <Head>
        <title>Memory oClock</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="container mx-auto">
        {/* <Debug /> */}
        <div onClick={() => founded.length < FRUITS.length ? activateTimer() : false} className="grid gap-6 grid-cols-6 align-center">
          {cards && cards.map((fruit, key) => <Card id={key} key={key} fruit={fruit} />)}
        </div>


        <InfoBar />
      </div>
      <ModalWin />
      <ModalLose />
    </>
  )
}
