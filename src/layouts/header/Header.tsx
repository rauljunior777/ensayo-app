import './Header.css';

export const Header = () => {
  return (
    <div className="header-container">
      <div className='header-title'>
        <h3>Where in the world?</h3>
      </div>
      <div className='header-mode'>
        <h5>Light Mode</h5>
      </div>
    </div>
  )
}

export default Header;