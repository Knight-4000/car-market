import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import './cart.scss';
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import CardTwo from "../../components/card/CardTwo";
import { MdShoppingCart } from "react-icons/md"

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
      toast.success("You must be logged in to checkout")
    }
  };

  return (
    <section>
      <div className="container table">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p className="text-center text-3xl">Your cart is currently empty.</p>
            <br />
            <div className="flex flex-col items-center">
            <Link to="/#autos">
              <button style={{display: "flex", justifyContent: "center"}}
                      className="bg-blue-600 inline-flex items-center px-3 py-3 font-medium 
                      rounded mb-6 mt-2 w-50 px-7 py-3 text-white font-medium text-sm uppercase 
                      shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
                      focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 
                      ease-in-out" 
                      ><BiArrowBack className="cart-icons"/> Back To Autos
                  </button>
              </Link>   
              </div>
          </>
        ) : (
          <>
            {cartItems.map((cart) => {
              const { id, model, price, mileage, imageURL, cartQuantity } = cart;
                return (
                  <CardTwo className="border" key={id}>
                    <div className="container mx-auto"> 
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="flex justify-center rounded-xl p-6">                        
                          <img className="object-cover"
                            src={imageURL}
                            alt={model}
                            style={{ width: "auto"}}
                          />
                        </div>
                        <div className="flex justify-center cart-column"><p className="text-xl">{model}</p></div>
                        <div className="flex justify-center cart-column"><p className="text-xl">Mileage:{mileage}</p></div>
                        <div className="flex justify-center cart-column"><p className="text-xl text-red-600 cursor-pointer"onClick={() => removeFromCart(cart)}>Remove</p></div>
                        <div className="flex justify-center cart-column"><p className="text-2xl text-blue-600">${(price * cartQuantity).toFixed(2)}</p></div>
                      </div>
                    </div>
                    </CardTwo>
                  );
                })}
                <br />
                <CardTwo>
                <div className="text">
                    <p>Subtotal:</p>
                    <p>{`$${cartTotalAmount.toFixed(2)}`}</p>
                  </div>
                
                  <p className="pl-4">Tax and shipping calculated at checkout</p>
               
               <div className="flex place-content-center">
                  <button style={{display: "flex", justifyContent: "center"}} 
                    className="bg-orange-600 
                    inline-flex items-center px-3 py-3 font-medium rounded mb-6 mt-2 w-50 px-7 py-3 
                    text-white font-medium text-sm uppercase shadow-md hover:bg-orange-700 hover:shadow-lg 
                    focus:bg-orange-700 focus:shadow-lg active:bg-orange-800 active:shadow-lg 
                    transition duration-150 ease-in-out"
                    onClick={checkout}
                  >
                    <MdShoppingCart className="cart-icons"/>Checkout
                  </button>
                  </div>
                </CardTwo>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
              <Link onClick={clearCart}>
                <button style={{display: "flex", justifyContent: "center"}} className="bg-red-600 
                  inline-flex items-center px-3 py-3 font-medium rounded mb-6 mt-2 w-50 px-7 py-3 
                  text-white font-medium text-sm uppercase shadow-md hover:bg-red-700 hover:shadow-lg 
                  focus:bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg 
                  transition duration-150 ease-in-out">  
                    <FaTrashAlt className="cart-icons"/>Clear Cart
                </button>
             </Link>
              <Link to="/#autos">
              <button style={{display: "flex", justifyContent: "center"}}
                      className="bg-blue-600 inline-flex items-center px-3 py-3 font-medium 
                      rounded mb-6 mt-2 w-50 px-7 py-3 text-white font-medium text-sm uppercase 
                      shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
                      focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 
                      ease-in-out" 
                      ><BiArrowBack className="cart-icons"/> Back To Autos
                  </button>
              </Link>   
            </div>
          </>
        )}
        
      </div>
    </section>
  );
};

export default Cart;