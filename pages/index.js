import Head from 'next/head'
import Card from '../components/card/Card';
import Debug from '../components/Debug';
import InfoBar from '../components/InfoBar';
import ModalLose from '../components/modal/ModalLose';
import ModalStartGame from '../components/modal/ModalStartGame';
import ModalWin from '../components/modal/ModalWin';
import { useGameContext } from '../context/GameContext';

import FRUITS from '../data/fruits'
import { client } from '../database/client';
import { PlayerRepository } from '../database/PlayerRepository';

export default function Home({ players }) {
  const { cards, founded, activateTimer } = useGameContext()
  return (
    <>
      <Head>
        <title>oClock Memory</title>
        <meta name="description" content="Memory game" />
      </Head>


      <div className="container mx-auto max-w-2xl">
        {/* <Debug /> */}
        <h1 className="flex items-center justify-center font-bold text-3xl h-20 uppercase">Memory oClock ⏱️</h1>
        <div onClick={() => founded.length < FRUITS.length ? activateTimer() : false} className="grid grid-cols-6 items-self">
          {cards && cards.map((fruit, key) => <Card id={key} key={key} fruit={fruit} />)}
        </div>

        <InfoBar />
      </div>
      <ModalStartGame players={players} />
      <ModalWin />
      <ModalLose />
    </>
  )
}

export async function getServerSideProps() {

  const repository = new PlayerRepository(client)
  const players = await repository.getLastByOrderAsc(10)

  client.quit()

  return {
    props: {
      players
    },
  }
}