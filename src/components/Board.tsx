import {styled} from 'styled-components'
import usePlay from '../hooks/usePlay'
import {SwitchTurn} from './SwitchTurn'
import {Square} from './Square'

export const Board: React.FC = () => {
  const {board, turn, winner, play, resetBoard} = usePlay()
  return (
    <>
      <section
        style={{
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {winner && <h1 style={{fontSize: '42px'}}>GANADOR: {winner}</h1>}
        {!winner && <SwitchTurn turn={turn} />}
      </section>
      <section className="board">
        {board.map((square, index) => (
          <Square key={index} index={index} onPlay={play} square={square} />
        ))}
      </section>
      <section>
        <ButtonRefresh onClick={resetBoard}>
          <i className="fa-sharp fa-solid fa-rotate-right"></i>
        </ButtonRefresh>
      </section>
    </>
  )
}
const ButtonRefresh = styled.button`
  font-size: 48px;
  background: none;
  background-color: #21356a;
  border: 2px solid #fff;
  border-radius: 20%;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
`
