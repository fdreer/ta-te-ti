import { styled } from 'styled-components'

const StyledButton = styled.button`
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  background: hsl(0deg 0% 75%);
  /* box-shadow: inset -1px -1px #292929, inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff; */
  -webkit-box-shadow: inset -1px -1px #292929, inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
  box-shadow: inset -1px -1px #292929, inset 1px 1px #fff,
    inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
  cursor: pointer;

  width: 140px;
  padding: 10px;
  font-size: 1rem;

  &:active {
    /* box-shadow: inset -1px -1px #fff, inset 1px 1px #292929,
      inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158); */
    -webkit-box-shadow: inset -1px -1px #fff, inset 1px 1px #292929,
      inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158);
    box-shadow: inset -1px -1px #fff, inset 1px 1px #292929,
      inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158);
  }
`

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  onClick?: () => void
}

export const Button = ({ children, onClick, type, style }: Props) => {
  return (
    <StyledButton type={type || 'button'} style={style} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
