import React from 'react'
import './header.scss';
import { Link } from 'react-router-dom';

const logo = (
  <div className='logo'>
    <Link to="/">
      <h2 className='text-2xl logo-one text-white'>
        Car<span className='logo-two'>Market</span>
      </h2>
      <p className='tagline'>Shop Online. Stay Home.</p>
    </Link>
</div>
)

const Header = () => {
  return (
    <header>
      <div className='header'>
        {logo}
        <nav>
          <ul className='list-none mx-auto hidden md:block'>
            <Link to="/" className='px-2'>
              Home
            </Link>
            <Link to="/contact" className='px-2'>
              Contact
            </Link>
          </ul>
          <div className='user-links'>
            <span className='links hidden md:block'>
              <Link to="/login" className='px-2'>Login</Link>
              <Link to="/register" className='px-2'>Register</Link>
            </span>
          </div>
        </nav>
      </div> 
    </header>
  )
}

export default Header
