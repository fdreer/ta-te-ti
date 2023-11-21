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

  const handleGameStart = () => {
    gameService.onStart(socket, ({ isMyTurn, symbol }) => {
      setIsMyTurn(isMyTurn)
      setMySymbol(symbol)
      setIsAnotherUser(true)
    })
  }

  const handleGameReset = () => {
    gameService.onResetBoard(socket, ({ isMyTurn, symbol }) => {
      setBoard(INITIAL_BOARD)
      setMySymbol(symbol)
      setIsMyTurn(isMyTurn)
      setWinner(null)
    })
  }

  const handleGameLeave = () => {
    gameService.onLeave(socket, () => {
      setIsAnotherUser(false)
      setBoard(INITIAL_BOARD)
      setMySymbol(null)
      setIsMyTurn(false)
      setWinner(null)
    })
  }

  useEffect(() => {
    handleGameStart()
    handleGameReset()
    handleGameLeave()
  }, [])

  // Este efecto se ejecuta cada vez que 'mySymbol' cambia.
  // Cuando 'mySymbol' es null, no se configura el oyente de eventos.
  // Cuando 'mySymbol' se actualiza a un valor no nulo, se configura el oyente de eventos con el valor actualizado de 'mySymbol'.
  // Esto es necesario porque los callbacks definidos dentro de useEffect utilizan una "instantánea" del estado y las props en el momento en que se definen.
  // Aunque 'mySymbol' se actualiza más tarde, el callback todavía estaría utilizando el valor antiguo de 'mySymbol' que es null.
  // Al mover esta lógica a un efecto separado, nos aseguramos de que el callback siempre tenga el valor más reciente de 'mySymbol'.
  useEffect(() => {
    if (mySymbol !== null) {
      gameService.onUpdate(socket, newBoard => {
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
  }, [mySymbol])

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
