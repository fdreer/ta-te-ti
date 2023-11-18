import styled from 'styled-components'
import { Square } from './Square'
import { Board } from '../../types/types'

interface BoardProps {
  board: Board
  onPlay: (index: number) => void
}

export const BoardGame = ({ board, onPlay }: BoardProps) => {
  return (
    <BoardGameStyled>
      {board.map((square, index) => (
        <Square key={index} index={index} onPlay={onPlay} square={square} />
      ))}
    </BoardGameStyled>
  )
}

const BoardGameStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0px;
`
