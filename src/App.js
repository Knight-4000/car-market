import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import { Header, Footer } from './components'
// Pages 
import { Home, Contact } from './pages'

function App() {
  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
