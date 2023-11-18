import { Board } from './types/types'

export const Turn = {
  X: 'X',
  O: 'O',
  NONE: null
} as const

export type TurnValue = (typeof Turn)[keyof typeof Turn]

export const INITIAL_BOARD = [
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

export const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export enum Event {
  CREATE = 'event_create',
  CREATED = 'room_created',
  JOIN = 'event_join',
  JOINED = 'room_joined',
  JOIN_ERROR = 'room_join_error',
  START_GAME = 'start_game',
  UPDATE_GAME = 'update_game',
  ON_UPDATE_GAME = 'on_game_update',
  RESET_BOARD = 'reset_board',
  ON_RESET_BOARD = 'on_reset_board',
  LEAVE = 'event_leave',
  ROOM_LEFT = 'room_left'
}
