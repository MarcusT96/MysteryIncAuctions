import { useState } from 'react'
import Auctionpage from './pages/Auctionpage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return <main>
    <Auctionpage />
  </main>
}
export default App
