import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import { Header, Footer } from './components'
// Pages 
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import { Home, Contact, Login, Register, Reset, Admin } from './pages'
import AutoDetails from "./components/auto/autoDetails/AutoDetails";
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Router>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<NotFound />} />
          <Route
             path="/admin/*"
             element={
               <AdminOnlyRoute>
                 <Admin />
               </AdminOnlyRoute>
             }
           />
           <Route path="/auto-details/:id" element={<AutoDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
