import { Link } from "react-router-dom"

function TempNav() {
  return (
    <nav>
      <Link to="/">TempHome</Link>
      <Link to="/ObjectPage">ObjectPage</Link>
    </nav>
  )
}

export default TempNav