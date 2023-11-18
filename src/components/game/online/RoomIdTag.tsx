import { Button } from '../../ui/buttons/Button'

interface Props {
  roomId: string
  onClick: () => void
}

export const RoomIdTag = ({ roomId, onClick }: Props) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <h4>Room: {roomId}</h4>
      <Button style={{ maxWidth: '90px' }} onClick={onClick}>
        Copy
      </Button>
    </section>
  )
}
