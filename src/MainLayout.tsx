import { styled } from 'styled-components'

export const MainLayout = ({
  children,
  style
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) => {
  return <MainStyled style={style}>{children}</MainStyled>
}

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
