import { Turn, TurnValue } from '../../constants'
import styled from 'styled-components'
import { CursorWindows } from '../ui/CursorWindows'

interface SlideProp {
  turn: TurnValue
}

const SlideTurn = styled.div<SlideProp>`
  transition: all 0.3s ease-in-out;
  transform: ${({ turn }) =>
    turn === Turn.O ? 'translateX(17px)' : 'translateX(-27px)'};
`

const ActualTurn = styled.p`
  font-size: 48px;
`

type SwitchTurnProps = {
  turn: TurnValue
  mySymbol?: TurnValue
}

export const SwitchTurn = ({ turn, mySymbol }: SwitchTurnProps) => {
  return (
    <section>
      <article>
        <SlideTurn turn={turn}>
          <CursorWindows />
        </SlideTurn>
      </article>
      <article
        style={{
          display: 'flex',
          gap: '15px'
        }}
      >
        <ActualTurn>{Turn.X}</ActualTurn>
        <ActualTurn>{Turn.O}</ActualTurn>
      </article>
    </section>
  )
}
