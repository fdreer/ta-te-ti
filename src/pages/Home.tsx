import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { Button } from '../components/ui/buttons/Button'

export const Home = () => {
  const navigate = useNavigate()

  const setOffline = () => {
    navigate('game-offline')
  }

  const setOnline = () => {
    navigate('game-online')
  }

  return (
    <MainLayout style={{ height: '100vh' }}>
      <h1>TA-TE-TI</h1>
      <section style={{ display: 'flex', gap: '20px', paddingTop: '15px' }}>
        <Button onClick={setOffline}>OFFLINE</Button>
        <Button onClick={setOnline}>ONLINE</Button>
      </section>
    </MainLayout>
  )
}
