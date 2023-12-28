import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../MainLayout'
import { Button } from '../components/ui/buttons/Button'
import Footer from '../components/Footer'

export const Home = () => {
  const navigate = useNavigate()

  const setOffline = () => {
    navigate('game-offline')
  }

  const setOnline = () => {
    navigate('game-online')
  }

  return (
    <>
      <MainLayout $flexGrow={true}>
        <h1>TA-TE-TI</h1>
        <section style={{ display: 'flex', gap: '20px', paddingTop: '15px' }}>
          <Button onClick={setOffline}>OFFLINE</Button>
          <Button onClick={setOnline}>ONLINE</Button>
        </section>
      </MainLayout>
      <Footer />
    </>
  )
}
