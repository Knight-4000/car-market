import React from 'react'
import './header.scss';
import { Link } from 'react-router-dom';

const logo = (
  <div className='logo'>
    <Link to="/">
      <h2 className='text-2xl'>
        Car<span>Market</span>
      </h2>
    </Link>
</div>
)

const Header = () => {
  return (
    <header>
      <div className='header'>
        {logo}
      </div> 
    </header>
  )
}

export default Header
