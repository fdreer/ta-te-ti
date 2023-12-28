import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gameService from '../services/game'
import { MainLayout } from '../MainLayout'
import { Button } from '../components/ui/buttons/Button'
import styled from 'styled-components'
import { socket } from '../contexts/OnlineContext'
import Footer from '../components/Footer'

export const OnlineGame = () => {
  const [join, setJoin] = useState<boolean>(false)
  const [roomId, setRoomId] = useState<string>('')
  const navigate = useNavigate()

  const handleChangeRoomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    gameService.joinRoom(socket, roomId).then(() => navigate(`${roomId}`))
  }

  const handleCreateRoom = async () => {
    const roomId = await gameService.createRoom(socket)
    navigate(`${roomId}`)
  }

  return (
    <>
      <MainLayout $flexGrow={true}>
        <h1>TA-TE-TI</h1>
        <section style={{ display: 'flex', gap: '20px', paddingTop: '15px' }}>
          <Button onClick={handleCreateRoom}>CREAR SALA</Button>
          <Button onClick={() => setJoin(true)}>UNIRSE A SALA</Button>
        </section>

        {join && (
          <form
            style={{
              display: 'flex',
              gap: '10px',
              padding: '20px 0px'
            }}
            onSubmit={handleJoinRoom}
          >
            <InputStyled
              type="text"
              name="roomId"
              onChange={handleChangeRoomId}
              placeholder="ROOM ID"
            />
            <Button style={{ maxWidth: '80px' }} type="submit">
              UNIRSE
            </Button>
          </form>
        )}
      </MainLayout>
      <Footer />
    </>
  )
}

const InputStyled = styled.input`
  width: 100%;
  border: 2px inset #d5d5d5;
  color: #424242;
  background: #fff;
  /* box-shadow: -1px -1px 0 0 #828282; */
  -webkit-box-shadow: -1px -1px 0 0 #828282;
  box-shadow: -1px -1px 0 0 #828282;
  margin-top: 4px;
  padding-left: 2px;
  max-width: 100%;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`
