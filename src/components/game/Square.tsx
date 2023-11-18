import styled from 'styled-components'
import { TurnValue } from '../../constants'

const SquareStyled = styled.article`
  width: 95px;
  height: 95px;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 42px;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  background: hsl(0deg 0% 75%);
  box-shadow: inset -1px -1px #292929, inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
`

interface Props {
  index: number
  onPlay: (index: number) => void
  square: TurnValue
}

export const Square = ({ index, onPlay, square }: Props) => {
  function handleClick() {
    onPlay(index)
  }

  return <SquareStyled onClick={handleClick}>{square}</SquareStyled>
}
