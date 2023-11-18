import { Socket } from 'socket.io-client'
import { Event } from '../constants'
import { Board, StartGame } from '../types/types'

class GameService {
  public async createRoom(socket: Socket): Promise<string> {
    return new Promise(rs => {
      socket.emit(Event.CREATE)
      socket.on(Event.CREATED, ({ roomId }: { roomId: string }) => rs(roomId))
    })
  }

  public async joinRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit(Event.JOIN, { roomId })
      socket.on(Event.JOINED, () => rs(true)) // --> retorna un true cuando el jugador se unió a la sala
      socket.on(Event.JOIN_ERROR, ({ error }) => rj(error)) // --> error al unirse (logica en el back)
    })
  }

  public async onStartGame(
    socket: Socket,
    listiner: (options: StartGame) => void
  ) {
    socket.on(Event.START_GAME, listiner)
  }

  public async updateGame(socket: Socket, board: Board) {
    socket.emit(Event.UPDATE_GAME, board)
  }

  public async onGameUpdate(socket: Socket, listiner: (board: Board) => void) {
    socket.on(Event.ON_UPDATE_GAME, board => listiner(board))
  }

  public async resetBoard(socket: Socket) {
    socket.emit(Event.RESET_BOARD)
  }

  public async onResetBoard(
    socket: Socket,
    listiner: (options: StartGame) => void
  ) {
    socket.on(Event.ON_RESET_BOARD, listiner)
  }

  public async leaveGame(socket: Socket) {
    socket.emit(Event.LEAVE)
  }

  public async onLeaveGame(socket: Socket, listiner: () => void) {
    socket.on(Event.ROOM_LEFT, listiner)
  }
}

// public async gameWin(socket: Socket, message: string) {
//   socket.emit('game_win', { message })
// }

// public async onGameWin(socket: Socket, listiner: (message: string) => void) {
//   socket.on('on_game_win', ({ message }) => listiner(message))
// }

export default new GameService()
