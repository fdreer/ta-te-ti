import { HeaderGame } from '../HeaderGame'

export const Game = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderGame />
      {children}
    </>
  )
}
