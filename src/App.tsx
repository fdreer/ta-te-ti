import { Outlet, useRoutes } from 'react-router-dom'
import { Home } from './pages/Home'
import { OfflineGame } from './pages/OfflineGame'
import { OnlineGame } from './pages/OnlineGame'
import { BoardOnline } from './components/game/online/BoardOnline'
import { OnlineContextProvider } from './contexts/OnlineContext'

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
          element: (
            <OnlineContextProvider>
              <OnlineGame />
            </OnlineContextProvider>
          )
        },
        {
          path: 'game-online/:id',
          element: (
            <OnlineContextProvider>
              <BoardOnline />
            </OnlineContextProvider>
          )
        }
      ]
    }
  ])

  return <>{router}</>
}

export default App
