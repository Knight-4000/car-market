import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
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
  const { document } = useFetchDocument("autos", id);

  useEffect(() => {
    setAuto(document);
  }, [document]);

  const addToCart = (auto) => {
    dispatch(ADD_TO_CART(auto));
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
                <div className="container mx-auto bg-gray-100 py-5">
                <h1 className="text-center details-name">{auto.year} {auto.model} {auto.trim}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                     
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><MdSpeed size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Mileage:</p><p className="pl-2 text-white">{auto.mileage}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><AiOutlineCheck size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Clean Title:</p><p className="pl-2 text-white">{auto.title}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><BsFillDropletFill size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Exterior:</p><p className="pl-2 text-white">{auto.exterior}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><GiCarSeat size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Interior:</p><p className="pl-2 text-white">{auto.interior}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><FaGasPump size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Fuel:</p><p className="pl-2 text-white">{auto.fuel}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><BsSpeedometer size="1.5em" color="white"/>
                      <p className="pl-2 text-white">MPG:</p><p className="pl-2 text-white">{auto.mpg}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><TbEngine size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Engine:</p><p className="pl-2 text-white">{auto.engine}</p>
                    </div>
                    <div className="flex justify-center text-xl border-2 
                    border-gray-300 rounded-xl p-6 details-box"><GiGearStickPattern size="1.5em" color="white"/>
                      <p className="pl-2 text-white">Transmission:</p><p className="pl-2 text-white">{auto.transmission}</p>
                    </div>
                  </div>
                </div>
              </CardTwo>
              <div class="flex justify-center py-4">
                <button type="submit" style={{display: "flex", justifyContent: "center"}}
                    className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
                    rounded mb-6 mt-2 w-50 px-7 py-3 text-white font-medium text-sm uppercase 
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