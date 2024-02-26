import logo from './assets/mysteryInc-logo.png'

function Navbar() {

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
            <li><a href="/auctions">Auktioner</a></li>
            <li><a href="/about">Om Oss</a></li>
            <li className='login'><a href="/login">Logga In</a></li>
          </ul>
        </nav>
      </header>
    </div>
  </>);
}

export default Navbar;
