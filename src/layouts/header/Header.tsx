import { useEffect, useState } from 'react';
import './Header.css';
import mediaLuna from '../../assets/media-luna.svg';

export const Header = () => {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light'
  });

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    if (theme === 'dark') document.querySelector('html')?.classList.add('dark');
    else document.querySelector('html')?.classList.remove('dark');
  }, [theme]);

  return (
    <div className="header-container bg-white dark:bg-dark-blue dark:text-white">
      <div className='header-title'>
        <h3 className='font-bold'>Where in the world?</h3>
      </div>
      <div className='header-mode'>
        <img src={mediaLuna} alt="Media luna" />
        <button type='button' onClick={handleChangeTheme}>
          <h5>{theme === 'light'? 'Light Mode' : 'Dark Mode'}</h5>
        </button>
      </div>
    </div>
  )
}

export default Header;