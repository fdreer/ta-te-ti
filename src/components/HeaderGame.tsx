import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { Button } from './ui/buttons/Button'
import { RoomIdTag } from './game/online/RoomIdTag'

export const HeaderGame = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const copyInCliboard = () => {
    navigator.clipboard.writeText(id as string)
  }

  const handleNavigate = () => {
    navigate('/ta-te-ti/')
  }

  return (
    <HeaderStyled>
      <Button
        style={{ maxWidth: '90px', height: '37px' }}
        onClick={handleNavigate}
      >
        SALIR
      </Button>
      {id && <RoomIdTag roomId={id} onClick={copyInCliboard} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  padding-top: 15px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  align-items: end;
  width: 100%;
`
