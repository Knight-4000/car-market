import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import { Header, Footer } from './components'
// Pages 
import { Home, Contact, Login, Register, Reset } from './pages'


function App() {
  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
