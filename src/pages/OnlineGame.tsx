import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gameService from '../services/game'
import { socket } from '../services/socket'
import { MainLayout } from '../MainLayout'
import { Button } from '../components/ui/buttons/Button'

export const OnlineGame = () => {
  const [join, setJoin] = useState<boolean>(false)
  const [roomId, setRoomId] = useState<string>('')
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    const roomId = await gameService.createRoom(socket)
    navigate(`${roomId}`)
  }

  const handleChangeRoomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    gameService
      .joinRoom(socket, roomId)
      .then(() => {
        navigate(`${roomId}`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <MainLayout style={{ height: '100vh' }}>
      <h1>TA-TE-TI</h1>
      <section style={{ display: 'flex', gap: '20px', paddingTop: '15px' }}>
        <Button onClick={handleCreateRoom}>CREAR SALA</Button>
        <Button onClick={() => setJoin(true)}>UNIRSE A SALA</Button>
      </section>

      {join && (
        <form onSubmit={handleJoinRoom}>
          <label htmlFor="roomId">Room ID:</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            onChange={handleChangeRoomId}
          />
          <Button type="submit">UNIRSE</Button>
        </form>
      )}
    </MainLayout>
  )
}
