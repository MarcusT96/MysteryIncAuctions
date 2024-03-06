import React, { useState } from 'react';
import useScrollDirection from './components/NavbarAnimation'

import logo from './assets/mysteryInc-logo.png'

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from "react-icons/md";


function Navbar() {
  useScrollDirection();

  const [toggleMenu, setToggleMenu] = useState(false);

  return (<>
    <nav className="app__navbar">
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
        <a href="/login" className="p__opensans">Logga In / Registrera</a>
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
              <li><a href="/login" onClick={() => setToggleMenu(false)}>Logga In / Registrera</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  </>);
}

export default Navbar;

