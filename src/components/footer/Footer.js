import React from 'react'
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <Link to="/">
          <h2 className='text-2xl text-white text-center cursor-pointer'>
            Car<span className='text-orange-500'>Market</span>
          </h2>
        </Link>
      </div>
    </>
  )
}

export default Footer
