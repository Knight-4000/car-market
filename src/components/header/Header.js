import React, { useEffect, useState } from 'react'
import './header.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Hamburger from '../Hamburger';
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { 
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";



const logo = (
  <div className='logo'>
    <Link to="/">
      <h2 className='text-2xl text-white'>
        Car<span className='text-orange-500 cursor-pointer'>Market</span>
      </h2>
      <p className='tagline'>Shop Online. Stay Home.</p>
    </Link>
</div>
)

const currentLink = ({ isActive }) => (isActive ? `current px-2` : "px-2")

const Header = () => {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch()

  // Verify if user is logged in
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          // take off and capitalize first letter of username
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName) 
        }
          dispatch(SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          }))
        } else {
          setDisplayName("")
          dispatch(REMOVE_ACTIVE_USER());
        }
      });
    }, [dispatch, displayName])

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("You have logged out")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  
  };
  
  return (
    <header className='fixed top-0 z-50'>
     <div className="header">
        {logo}
        <nav>
          <ul className='list-none mx-auto hidden-mobile'>
            <AdminOnlyLink>
              <NavLink to="/admin/home" className="pr-2">
                  Admin
              </NavLink>
            </AdminOnlyLink>   
            <NavLink to="/" className={currentLink}>
              Home
            </NavLink>
            <NavLink to="/contact" className={currentLink}>
              Contact
            </NavLink>
            <NavLink to="/cart" className={currentLink}>
            <FaShoppingCart size={20} />
            </NavLink>
          </ul>
          <div className='user-links'>
            <span className='links hidden-mobile'>
              <ShowOnLogin>
           <a href="#user" className='px-2'><FaUserCircle size={16} className="user-icon" />
              {displayName}</a>  
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/login" className={currentLink}>Login</NavLink>
              
                <NavLink to="/register" className={currentLink}>Register</NavLink>
                </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
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
