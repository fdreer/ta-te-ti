import { Outlet, useRoutes } from 'react-router-dom'
import { Home } from './pages/Home'
import { OfflineGame } from './pages/OfflineGame'
import { OnlineGame } from './pages/OnlineGame'
import { BoardOnline } from './components/game/online/BoardOnline'

const App = () => {
  const router = useRoutes([
    {
      path: '/ta-te-ti',
      element: <Outlet />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'game-offline',
          element: <OfflineGame />
        },
        {
          path: 'game-online',
          element: <OnlineGame />
        },
        {
          path: 'game-online/:id',
          element: <BoardOnline />
        }
      ]
    }
  ])

  return <>{router}</>
}

export default App
