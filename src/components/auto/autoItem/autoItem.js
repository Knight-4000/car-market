import React from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import "./AutoItem.scss";

export default function AutoItem({auto, model, make, category, trim, price, mileage, 
  desc, imageURL, id}) {
    const dispatch = useDispatch();
  
    const addToCart = (auto) => {
      dispatch(ADD_TO_CART(auto));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    };
  return (
    <>
    <Card>
      <Link to={`/auto-details/${id}`}>
        <div className="img-view" id="autos">
          <img src={imageURL} alt={make} />     
          <h4 className='text-black text-center model py-2'><b>{model}</b></h4>
          <div className="flex justify-between py-2">
            <p className=''>{trim}</p>
            <p className='text-black text-left mileage'>{mileage} miles</p> 
          </div>
          <p className='text-black price py-2'>${price}</p>
          <button type="submit" style={{display: "flex", justifyContent: "center"}}
              className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
              rounded mb-6 mt-2 w-full px-7 py-3 text-white font-medium text-sm uppercase 
              shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 
              focus:shadow-lg active:bg-orange-800 active:shadow-lg transition duration-150 
              ease-in-out" onClick={() => addToCart(auto)}> Place Order</button>
         </div>
      </Link>
    </Card>
   </>
  )
}

