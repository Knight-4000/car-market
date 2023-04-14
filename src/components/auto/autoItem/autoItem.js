import React from 'react'
import { Link } from 'react-router-dom';
import Card from "../../card/Card";
import styles from "./AutoItem.module.scss";

export default function AutoItem({auto, grid, model, name, price, mileage, 
  desc, imageURL, id}) {
  return (
    <>
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/auto-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
        <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4 className='text-black'>{name}</h4>
          <h4 className='text-black'>{model}</h4>
        </div>
        {!grid && <p className={styles.desc}>{desc}</p>}

        <button className="">Add To Cart</button>
      </div>
      </Link>
   </Card>
   </>
  )
}

