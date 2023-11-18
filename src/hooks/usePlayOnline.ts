import { useEffect, useState } from 'react'
import { Board } from '../types/types'
import { INITIAL_BOARD, Turn, TurnValue } from '../constants'
import { checkWinner } from '../utils/board'
import confetti from 'canvas-confetti'
import gameService from '../services/game'
import { socket } from '../services/socket'

export default function usePlayOnline() {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD)
  // Para saber cuando se une un usuario (para pantalla de espera):
  const [isAnotherUser, setIsAnotherUser] = useState<boolean>(false)
  //   Para saber cual es el simbolo que nos toca:
  const [mySymbol, setMySymbol] = useState<TurnValue>(null)
  // Para saber si es mi turno:
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false)
  const [winner, setWinner] = useState<false | TurnValue>(false)

  // logica para sacar el currentTurn:
  // 1. Si es mi turno --> isMyTurn === true --> entonces debo mostrar mi simbolo

  const handleGameStart = async () => {
    await gameService.onStartGame(socket, ({ isMyTurn, symbol }) => {
      setIsMyTurn(isMyTurn)
      setMySymbol(symbol)
      setIsAnotherUser(true)
    })
  }

  const handleGameUpdate = async () => {
    await gameService.onGameUpdate(socket, newBoard => {
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
    await gameService.onLeaveGame(socket, () => {
      console.log('Se desonecto un usuario')

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

  const play = async (index: number) => {
    if (isMyTurn === false || board[index] || winner) return
    const newBoard: Board = [...board]
    newBoard[index] = mySymbol
    await gameService.updateGame(socket, newBoard)
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
    board,
    mySymbol,
    currentTurn: isMyTurn ? mySymbol : mySymbol === Turn.X ? Turn.O : Turn.X,
    winner,
    isAnotherUser,
    play,
    resetBoard
  }
}
