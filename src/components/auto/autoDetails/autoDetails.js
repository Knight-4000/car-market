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
import CardTwo from "../../card/CardTwo";
import './autodetails.scss';
import { BiArrowBack } from "react-icons/bi";
import { MdSpeed } from "react-icons/md";
import { BsFillDropletFill } from "react-icons/bs";
import { GiCarSeat } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";
import { TbEngine } from "react-icons/tb";
import { BsSpeedometer } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";

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
    <section className="mt-20">
      <div className="container">
        {auto === null ? (
          <Loader />
        ) : (
          <>
            <div>
            <CardTwo>
              <div className="img">
                <img src={auto.imageURL} alt={auto.model} />
              </div>
              </CardTwo>
              <div className="content mt-10">
                <CardTwo>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
              <h2 className="text-center model">{auto.model} Details</h2>
                <p className="text-center price">{`$${auto.price}`}</p>
            
                <div>
                    <p className="text-center">Mileage:<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                      <p className="text-center"> Clean Title?<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                    <p className="text-center">Exterior:<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                    <p className="text-center">Interior:<p className="text-center"></p>{auto.make}</p>
                  </div>
              
                  <div>
                    <p className="text-center">Fuel:<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                    <p className="text-center">Engine:<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                    <p className="text-center">Mileage:<p className="text-center"></p>{auto.make}</p>
                  </div>
                  <div>
                    <p className="text-center">Transmission:<p className="text-center"></p>{auto.make}</p>
                  </div>
         </div>
              </CardTwo>
              <div class="flex justify-center py-4">
                <button type="submit" style={{display: "flex", justifyContent: "center"}}
              className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
              rounded mb-6 mt-2 w-full px-7 py-3 text-white font-medium text-sm uppercase 
              shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 
              focus:shadow-lg active:bg-orange-800 active:shadow-lg transition duration-150 
              ease-in-out" onClick={() => addToCart(auto)}> Place Order</button>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
      <Link to="/#autos">
                <div className="flex">
                  <BiArrowBack className="arrow-icon"/>
                  Back To Autos
                </div>
              </Link>
    </section>
  );
};

export default AutoDetails;