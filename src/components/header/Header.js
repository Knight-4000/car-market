import React from 'react'
import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger';

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
     <div className="header">
        {logo}
        <nav>
          <ul className='list-none mx-auto hidden-mobile'>
            <NavLink to="/" className={({isActive}) => (isActive ? `current px-2` : "px-2")}>
              Home
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => (isActive ? `current px-2` : "px-2")}>
              Contact
            </NavLink>
          </ul>
          <div className='user-links'>
            <span className='links hidden-mobile'>
              <NavLink to="/login" className='px-2'>Login</NavLink>
              <NavLink to="/register" className='px-2'>Register</NavLink>
            </span>
          </div>
        </nav>
        <div className='menu-icon'>
          <Hamburger />
        </div>
      </div> 
    </header>
  )
}

export default Header
