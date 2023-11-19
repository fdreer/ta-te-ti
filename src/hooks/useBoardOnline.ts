import { useContext } from 'react'
import { OnlineContext } from '../contexts/OnlineContext'

export const useBoardContext = () => {
  const context = useContext(OnlineContext)
  if (!context) {
    throw new Error(
      'useBoardContext debe ser usado dentro de un OnlineContextProvider'
    )
  }
  const {
    board,
    isAnotherUser,
    isMyTurn,
    mySymbol,
    winner,
    setBoard,
    setIsAnotherUser,
    setIsMyTurn,
    setMySymbol,
    setWinner
  } = context
  return {
    board,
    isAnotherUser,
    isMyTurn,
    mySymbol,
    winner,
    setBoard,
    setIsAnotherUser,
    setIsMyTurn,
    setMySymbol,
    setWinner
  }
}
