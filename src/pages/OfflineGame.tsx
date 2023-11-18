import { Board } from '../components/game/offline/Board'
import { Game } from '../components/game/Game'
import { MainLayout } from '../MainLayout'

export const OfflineGame = () => {
  return (
    <Game>
      <MainLayout>
        <Board />
      </MainLayout>
    </Game>
  )
}
