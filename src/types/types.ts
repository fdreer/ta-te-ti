import { TurnValue } from '../constants'

export type Board = [
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue,
  TurnValue
]

export type StartGame = {
  isMyTurn: boolean
  symbol: 'X' | 'O'
}
