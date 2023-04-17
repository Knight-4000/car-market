import React from 'react'
import { Link } from 'react-router-dom';
import Card from "../../card/Card";
import "./AutoItem.scss";

export default function AutoItem({auto, grid, model, make, category, price, mileage, 
  desc, imageURL, id}) {
  return (
    <>
    <Card cardClass={grid ? 'grid' : 'list'}>
      <Link to={`/auto-details/${id}`}>
        <div className="img">
          <img src={imageURL} alt={make} />
        </div>
        <div className="content">
        <div className="details">
          <p>{`$${price}`}</p>
          <h4 className='text-black'>{category}</h4>
          <h4 className='text-black'>{make}</h4>
          <h4 className='text-black'>{model}</h4>
        </div>
        <p className="desc">{desc}</p>

        <button className="">Add To Cart</button>
      </div>
      </Link>
   </Card>
   </>
  )
}

