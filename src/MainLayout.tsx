import { styled } from 'styled-components'

type MainStyledProps = {
  $flexGrow?: boolean
}

export const MainLayout = styled.main<MainStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: ${({ $flexGrow }) => ($flexGrow ? '1' : '0')};
`
