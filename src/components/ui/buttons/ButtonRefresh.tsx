import { Button } from './Button'

type ButtonRefreshProps = {
  onClick?: () => void
}

export const ButtonRefresh = ({ onClick }: ButtonRefreshProps) => {
  return (
    <Button onClick={onClick} style={{ fontSize: '1.4rem', maxWidth: '60px' }}>
      <i className="fa-sharp fa-solid fa-rotate-right"></i>
    </Button>
  )
}
