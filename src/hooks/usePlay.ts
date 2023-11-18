import { useState } from 'react'
import { Board } from '../types/types'
import { Turn, TurnValue } from '../constants'
import { checkWinner } from '../utils/board'
import confetti from 'canvas-confetti'

const INITIAL_BOARD = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
] as Board

export default function usePlay() {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD)
  const [turn, setTurn] = useState<TurnValue>(Turn.X)
  const [winner, setWinner] = useState<boolean | TurnValue>(false)

  const play = (index: number) => {
    if (board[index] || winner) return

    const newBoard: Board = [...board]
    newBoard[index] = turn
    const newTurn = turn === Turn.X ? Turn.O : Turn.X
    setBoard(newBoard)
    setTurn(newTurn)

    const isWinner = checkWinner(newBoard)
    if (isWinner) {
      setWinner(turn)
      confetti()
      return
    }
  }

  const resetBoard = () => {
    setBoard(INITIAL_BOARD)
    setTurn(Turn.X)
    setWinner(false)
  }

  return { board, turn, winner, play, resetBoard }
}
