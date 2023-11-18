import { io, Socket } from 'socket.io-client'

class SocketService {
  private static socket: Socket

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getSocket(): Socket {
    if (!SocketService.socket) {
      this.socket = io('http://localhost:3000')

      // if (!this.socket) return

      this.socket.on('connect', () => {
        console.log(`Socket conectado id: ${this.socket?.id}`)
        return this.socket as Socket
      })

      this.socket.on('connect_error', err => {
        console.log('Connection error: ', err)
        return err
      })
    }

    return this.socket
  }
}

export const socket = SocketService.getSocket()
