import { Board } from '../types/types'
import { INITIAL_BOARD, Turn } from '../constants'
import { checkWinner } from '../utils/board'
import confetti from 'canvas-confetti'
import gameService from '../services/game'
import { useBoardContext } from './useBoardOnline'
import { socket } from '../contexts/OnlineContext'

const usePlayOnline = () => {
  const {
    isMyTurn,
    board,
    mySymbol,
    winner,
    setBoard,
    setIsMyTurn,
    setWinner
  } = useBoardContext()

  const play = async (index: number) => {
    if (isMyTurn === false || board[index] || winner) return
    const newBoard: Board = [...board]
    newBoard[index] = mySymbol
    await gameService.update(socket, newBoard)
    setBoard(newBoard)
    setIsMyTurn(false)

    const isWinner = checkWinner(newBoard)
    if (isWinner) {
      setWinner(mySymbol)
      confetti()
      return
    }
  }

  const resetBoard = async () => {
    await gameService.resetBoard(socket)
    setBoard(INITIAL_BOARD)
    setWinner(false)
  }

  return {
    currentTurn: isMyTurn ? mySymbol : mySymbol === Turn.X ? Turn.O : Turn.X,
    play,
    resetBoard
  }
}
export default usePlayOnline
