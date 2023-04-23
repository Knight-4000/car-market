import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import { Header, Footer } from './components'
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
// Pages 
import { Home, Contact, Login, Register, Reset, Admin } from './pages'
import AutoDetails from "./components/auto/autoDetails/AutoDetails";
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/cart/Cart';
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";

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
           <Route path="/cart" element={<Cart />} />
           <Route path="/checkout-details" element={<CheckoutDetails />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/checkout-success" element={<CheckoutSuccess />} />
           <Route path="/order-history" element={<OrderHistory />} />
           <Route path="/order-details/:id" element={<OrderDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
