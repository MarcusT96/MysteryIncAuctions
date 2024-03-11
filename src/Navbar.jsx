import React, { useState, useEffect } from 'react';
import useScrollDirection from './components/NavbarAnimation';
import logo from './assets/mysteryInc-logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from "react-icons/md";
import LogIn from './pages/LogIn';
import { useAuth } from '../src/admin/AdminComponents/auth/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

function Navbar() {
  useScrollDirection();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginModal = () => setShowLoginModal(!showLoginModal);

  const { user } = useAuth();
  const shouldBeHidden = location.pathname === '/dashboard' && user && user.isAdmin;

  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  const hiddenClass = shouldBeHidden ? 'hidden' : '';

  return (
    <>
      <nav className={`app__navbar ${hiddenClass}`}>
        <div className="app__navbar-logo">
          <a href="/"><img src={logo} alt="app__logo" /></a>
        </div>
        <ul className="app__navbar-links">
          <li className="p__opensans"><a href="/">Home</a></li>
          <li className="p__opensans"><a href="/Auctionpage">Auktioner</a></li>
          <li className="p__opensans"><a href="/about">Om Oss</a></li>
          <li className="p__opensans"><a href="/contact">Kontakt</a></li>
        </ul>
        <div className="app__navbar-login">
          {isLoggedIn ? (
            <a href="/profile" className="p__opensans-profil">Min Profil</a>
          ) : (
            <button className="app__navbar-login" onClick={handleLoginModal}>Logga In / Registrera</button>
          )}
        </div>
        <div className="app__navbar-smallscreen">
          <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <MdClose color="#ffd700" fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <li><a href="/" onClick={() => setToggleMenu(false)}>Home</a></li>
                <li><a href="/Auctionpage" onClick={() => setToggleMenu(false)}>Auktioner</a></li>
                <li><a href="/about" onClick={() => setToggleMenu(false)}>Om Oss</a></li>
                <li><a href="/contact" onClick={() => setToggleMenu(false)}>Kontakt</a></li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {showLoginModal && <LogIn closeModal={handleLoginModal} />}
    </>
  );
}

export default Navbar;
