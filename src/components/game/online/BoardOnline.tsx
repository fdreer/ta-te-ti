import usePlayOnline from '../../../hooks/usePlayOnline'
import { ButtonRefresh } from '../../ui/buttons/ButtonRefresh'
import { Game } from '../Game'
import { MainLayout } from '../../../MainLayout'
import { BoardGame } from '../BoardGame'
import LoadingSpinner from '../../ui/LoadingSpinner'
import { HeaderGame } from '../../HeaderGame'
import { SwitchTurn } from '../SwitchTurn'
import { useBoardContext } from '../../../hooks/useBoardOnline'

export const BoardOnline = () => {
  const { isAnotherUser, winner, mySymbol, board } = useBoardContext()
  const { currentTurn, play, resetBoard } = usePlayOnline()

  if (!isAnotherUser) {
    return (
      <MainLayout
        style={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <HeaderGame />
        <section>
          <h2 style={{ paddingBottom: '15px' }}>Esperando a otro jugador...</h2>
          <LoadingSpinner />
        </section>
      </MainLayout>
    )
  }

  return (
    <Game>
      <MainLayout>
        <section
          style={{
            height: '80px',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            gap: '35px'
          }}
        >
          {winner && <h2 style={{ fontSize: '32px' }}>GANADOR: {winner}</h2>}
          {!winner && (
            <h3 style={{ paddingBottom: '10px' }}>Tu símbolo: {mySymbol}</h3>
          )}
          {!winner && <SwitchTurn turn={currentTurn} />}
        </section>

        <BoardGame onPlay={play} board={board} />
        <ButtonRefresh onClick={resetBoard} />
      </MainLayout>
    </Game>
  )
}
