import { GameProvider } from '../context/GameContext'
import '../styles/globals.scss'



function MyApp({ Component, pageProps }) {
  return <GameProvider>
    <Component {...pageProps} />
  </GameProvider>

}

export default MyApp
