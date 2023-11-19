import { createContext, useEffect, useState } from 'react'
import gameService from '../services/game'
import { SocketService } from '../services/socket'
import { INITIAL_BOARD, Turn, TurnValue } from '../constants'
import confetti from 'canvas-confetti'
import { checkWinner } from '../utils/board'
import { Board } from '../types/types'

type OnlineContextType = {
  board: Board
  isAnotherUser: boolean
  mySymbol: TurnValue
  isMyTurn: boolean
  winner: false | TurnValue
  setBoard: (board: Board) => void
  setIsAnotherUser: (isAnotherUser: boolean) => void
  setMySymbol: (mySymbol: TurnValue) => void
  setIsMyTurn: (isMyTurn: boolean) => void
  setWinner: (winner: false | TurnValue) => void
}

export const OnlineContext = createContext<OnlineContextType | undefined>(
  undefined
)

export const socket = SocketService.getSocket()

export const OnlineContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD)
  const [isAnotherUser, setIsAnotherUser] = useState<boolean>(false)
  const [mySymbol, setMySymbol] = useState<TurnValue>(null)
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false)
  const [winner, setWinner] = useState<false | TurnValue>(false)

  // TODO: compartiendo el link de la sala deberia unirse el jugador a la partida
  // TODO: sirve para compartir la url y unirse a la sala
  // Cual es el error?? --> al crear una sala:
  // 1. Se crea una sala y se redirige a /game-online/:roomId
  // 2. Se ejecuta en el useEffect el handleJoinRomm e intenta unirse a la sala a la que ya está
  // 3. Salta el error
  // const handleJoinRomm = (roomId: string) => {
  //   gameService
  //     .joinRoom(socket, roomId)
  //     .then(() => {
  //       console.log('Te uniste a la sala ' + roomId)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const handleGameStart = async () => {
    await gameService.onStart(socket, ({ isMyTurn, symbol }) => {
      setIsMyTurn(isMyTurn)
      setMySymbol(symbol)
      setIsAnotherUser(true)
    })
  }

  const handleGameUpdate = async () => {
    await gameService.onUpdate(socket, newBoard => {
      setIsMyTurn(true)
      setBoard(newBoard)

      const isWinner = checkWinner(newBoard)
      if (isWinner) {
        setWinner(mySymbol === Turn.X ? Turn.O : Turn.X)
        confetti() // TODO: deberia haber algun efecto que indique que perdiste y no los confettis
        return
      }
    })
  }

  const handleGameReset = async () => {
    await gameService.onResetBoard(socket, ({ isMyTurn, symbol }) => {
      setBoard(INITIAL_BOARD)
      setMySymbol(symbol)
      setIsMyTurn(isMyTurn)
      setWinner(false)
    })
  }

  const handleGameLeave = async () => {
    await gameService.onLeave(socket, () => {
      setIsAnotherUser(false)
      setBoard(INITIAL_BOARD)
      setMySymbol(null)
      setIsMyTurn(false)
      setWinner(false)
    })
  }

  useEffect(() => {
    handleGameStart()
    handleGameUpdate()
    handleGameReset()
    handleGameLeave()

    return () => {
      // gameService
      //   .leaveGame(socket)
      //   .then(() => console.log('Usuario desconectado'))
    }
  }, [])

  return (
    <OnlineContext.Provider
      value={{
        board,
        isAnotherUser,
        isMyTurn,
        mySymbol,
        winner,
        setBoard,
        setIsAnotherUser,
        setMySymbol,
        setIsMyTurn,
        setWinner
      }}
    >
      {children}
    </OnlineContext.Provider>
  )
}
