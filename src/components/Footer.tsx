import heartPixel from '../assets/heart.svg'

const Footer = () => {
  return (
    <footer
      style={{
        paddingBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        fontSize: '24px'
      }}
    >
      <span>Made with</span>
      <img src={heartPixel} alt="heart" style={{ width: '24px' }} />
      <span>by Franco</span>
    </footer>
  )
}

export default Footer
