import { useState, useEffect } from 'react';
import './styles.css'
import './styles/main.css'
import Logo from './assets/Logo.svg'
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
  id: number;
  name: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => setGames(response.data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={Logo}></img>
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className=''>duo</span> está aqui.</h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => (
          <GameBanner key={game.id} title={game.name} bannerUrl={game.bannerUrl} adsCount={game._count.ads}/>
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
