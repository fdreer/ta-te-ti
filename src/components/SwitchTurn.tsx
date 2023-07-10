import {TURN, TurnValue} from '../constants'
import styled from 'styled-components'

interface ArrowProps {
  readonly turn: TurnValue
}

const Arrow = styled.p<ArrowProps>`
  font-size: 48px;
  transition: all 0.3s ease-in-out;
  transform: ${({turn}) =>
    turn === TURN.O ? 'translateX(44px)' : 'translateX(-44px)'};
`

type Props = {
  turn: TurnValue
}

export const SwitchTurn: React.FC<Props> = ({turn}) => {
  return (
    <section style={{marginBottom: '50px'}}>
      <article>
        <Arrow turn={turn}>
          <ArrowTurn />
        </Arrow>
      </article>
      <article className="switch-turn">
        <p>{TURN.X}</p>
        <p>{TURN.O}</p>
      </article>
    </section>
  )
}

const ArrowTurn: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-arrow-big-down-filled"
      width="62"
      height="62"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
        strokeWidth="0"
        fill="currentColor"
      />
    </svg>
  )
}
