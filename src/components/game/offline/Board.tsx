import usePlay from '../../../hooks/usePlay'
import { SwitchTurn } from '../SwitchTurn'
import { BoardGame } from '../BoardGame'
import { MainLayout } from '../../../MainLayout'
import { ButtonRefresh } from '../../ui/buttons/ButtonRefresh'

export const Board = () => {
  const { board, turn, winner, play, resetBoard } = usePlay()
  return (
    <MainLayout>
      <section
        style={{
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {winner && <h2 style={{ fontSize: '32px' }}>GANADOR: {winner}</h2>}
        {!winner && <SwitchTurn turn={turn} />}
      </section>

      <BoardGame board={board} onPlay={play} />
      <ButtonRefresh onClick={resetBoard} />
    </MainLayout>
  )
}
