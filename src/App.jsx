import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './pages/AboutUs.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
