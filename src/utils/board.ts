import {WINNER_COMBINATIONS} from '../constants'
import {Board} from '../types/types'

export const checkWinner = (board: Board): boolean => {
  return WINNER_COMBINATIONS.some(combination => {
    const [a, b, c] = combination
    return board[a] && board[a] === board[b] && board[a] === board[c]
  })
}
