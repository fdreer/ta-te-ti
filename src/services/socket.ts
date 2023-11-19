import { io, Socket } from 'socket.io-client'

export class SocketService {
  private static socket: Socket

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getSocket(): Socket {
    if (!SocketService.socket) {
      this.socket = io(`${import.meta.env.VITE_URL_SERVER}`)

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
