import React from 'react'
import { Link } from 'react-router-dom';
import Card from "../../card/Card";
import "./AutoItem.scss";

export default function AutoItem({auto, model, make, category, price, mileage, 
  desc, imageURL, id}) {
  return (
    <>
    <Card>
      <Link to={`/auto-details/${id}`}>
        <div className="img-view" id="autos">
          <img src={imageURL} alt={make} />
        
          
          <h4 className='text-black text-center model py-2'><b>{model}</b></h4>
          <div className="flex justify-between py-2">
            <p className=''>Trim</p>
            <p className='text-black text-left mileage'>{mileage} miles</p> 
          </div>
          <p className='text-black price py-2'>${price}</p>
          <button type="submit" style={{display: "flex", justifyContent: "center"}}
              className="bg-orange-600 inline-flex items-center px-3 py-3 font-medium 
              rounded mb-6 mt-2 w-full px-7 py-3 text-white font-medium text-sm uppercase 
              shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 
              focus:shadow-lg active:bg-orange-800 active:shadow-lg transition duration-150 
              ease-in-out"> Place Order</button>
         </div>
      </Link>
      </Card>
   </>
  )
}

