import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import Onthaal from './pages/Onthaal';
import Motivering from './pages/Motivering';
import Cycli from './pages/Cycli';
import Getuigenissen from './pages/Getuigenissen';
import Contact from './pages/Contact';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <header>
        <Link to="/">
          <img src="/logo-roc.png" alt="Je huis op de rots bouwen logo" className="logo" style={{height: 60, marginBottom: 8}} />
          <span className="logo-text">Je huis op de rots bouwen</span>
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Onthaal</Link></li>
            <li><Link to="/motivering">Motivering</Link></li>
            <li><Link to="/cycli">Cycli en Methodologie</Link></li>
            <li><Link to="/getuigenissen">Getuigenissen</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Onthaal />} />
          <Route path="/motivering" element={<Motivering />} />
          <Route path="/cycli" element={<Cycli />} />
          <Route path="/getuigenissen" element={<Getuigenissen />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
