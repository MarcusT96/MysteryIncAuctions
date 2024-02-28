import { Link } from "react-router-dom"

function TempNav() {
  return (
    <nav>
      <Link to="/">Home page</Link>
      <Link to="/ObjectPage">ObjectPage</Link>
      <Link to="/Auctionpage">Auctionpage</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default TempNav