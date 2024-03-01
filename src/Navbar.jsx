import logo from './assets/mysteryInc-logo.png'

import { useEffect } from 'react';

function useScrollDirection() {
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const header = document.querySelector('.navbar');

      if (scrollY > lastScrollY) {
        // Scrolling down
        header.classList.add('hide');
      } else {
        // Scrolling up
        header.classList.remove('hide');
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);
}

function Navbar() {
  useScrollDirection();

  return (<>
    <div className='navbar'>
      <header className="nav-header">
        <h1 className="nav-title">Mysterybox Auktionen!📦</h1>
        <nav className='nav'>
          <ul className='nav-menu'>
            <div className="nav-logo"><a href="/">
              <img src={logo} alt="Mystery Inc Logo" /></a>
            </div>
            <li><a href="/">Home</a></li>
            <li><a href="/Auctionpage">Auktioner</a></li>
            <li><a href="/about">Om Oss</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <li className='login'><a href="/login">Logga In</a></li>
          </ul>
        </nav>
      </header>
    </div>
  </>);
}

export default Navbar;

