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

const currentLink = ({ isActive }) => (isActive ? `current px-2` : "px-2")


const Header = () => {
  return (
    <header>
     <div className="header">
        {logo}
        <nav>
          <ul className='list-none mx-auto hidden-mobile'>
            <NavLink to="/" className={currentLink}>
              Home
            </NavLink>
            <NavLink to="/contact" className={currentLink}>
              Contact
            </NavLink>
          </ul>
          <div className='user-links'>
            <span className='links hidden-mobile'>
              <NavLink to="/login" className={currentLink}>Login</NavLink>
              <NavLink to="/register" className={{currentLink}}>Register</NavLink>
            </span>
          </div>
        </nav>
        <div className='menu-icon'>
          <Hamburger onCurrentLink={currentLink}/>
        </div>
      </div> 
    </header>
  )
}

export default Header
