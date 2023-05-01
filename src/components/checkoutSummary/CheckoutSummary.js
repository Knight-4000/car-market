import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import './checkoutsummary.scss';

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  return (
    <div>
      <h1>Checkout Summary</h1>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No autos in your cart.</p>
            <button className="btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
            {cartItems.map((item) => {
              const { id, model, price} = item;
              return (
                <div key={id}>
                  <h4>Auto: {model}</h4>
                  <p>Unit price: {price}</p>
            </div>
              );
            })}
            </p>
            <div className="text">
              <h4>Subtotal:</h4>
              <h1>{`$${cartTotalAmount.toFixed(2)}`}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;