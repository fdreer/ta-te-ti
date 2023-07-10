import {TurnValue} from '../constants'

type Props = {
  index: number
  onPlay: (index: number) => void
  square: TurnValue
}

export const Square: React.FC<Props> = ({index, onPlay, square}) => {
  function handleClick() {
    onPlay(index)
  }

  return (
    <article className="square" onClick={handleClick}>
      {square}
    </article>
  )
}
