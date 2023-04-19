import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import Auto from "../Auto";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import Card from "../../card/Card";
import './autodetails.scss';
import { BiArrowBack } from "react-icons/bi";



const AutoDetails = () => {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("autos", id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setAuto(document);
  }, [document]);

  const addToCart = (auto) => {
    dispatch(ADD_TO_CART(auto));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (auto) => {
    dispatch(DECREASE_CART(auto));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className="container auto">
        <h2>Auto Details</h2>
        <Link to="/#autos">
                <div className="flex">
                  <BiArrowBack className="arrow-icon"/>
                  Back To Autos
                </div>
              </Link>
        {auto === null ? (
          <Loader />
        ) : (
          <>
            <div className="details">
              <div className="img">
                <img src={auto.imageURL} alt={auto.model} />
              </div>
              <div className="content">
                <h3>{auto.model}</h3>
                <p className="price">{`$${auto.price}`}</p>
                <p>{auto.desc}</p>
                <p>
                  <b>{auto.make}</b>
                </p>

                <button
                  className="btn"
                  onClick={() => addToCart(auto)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AutoDetails;