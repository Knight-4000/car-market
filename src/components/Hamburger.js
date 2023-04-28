import { useState, useEffect }  from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './hamburger.css';
import { NavLink, useNavigate } from 'react-router-dom'
import ShowOnLogin, { ShowOnLogout } from "../components/hiddenLink/hiddenLink";
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { auth } from "../firebase/config";
import { 
    SET_ACTIVE_USER,
    REMOVE_ACTIVE_USER
  } from "../redux/slice/authSlice";

const currentLink = ({ isActive }) => (isActive ? `current px-2` : "px-2")

const Hamburger = ({onCurrentLink}) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate()

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

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setSidebar(sidebar)
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setSidebar(!sidebar)
        }
        setSidebar(!sidebar)
        setIsMenuClicked(!isMenuClicked)
    }
    
    const logoutUser = () => {
        signOut(auth).then(() => {
          toast.success("You have logged out")
          navigate("/")
        }).catch((error) => {
          toast.error(error.message)
        });
      
      };
  
  return (
    <>
        <div className="burger-menu hidden-large" onClick={updateMenu}>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
        </div> 

        <nav className={sidebar ? 'nav-menu active flex flex-col ' : 'nav-menu flex flex-col '}>
            <ul className='nav-menu-items block' onClick={showSidebar}>
                <li className='text-center hamburger-link' onClick={updateMenu}><NavLink to="/" onClick={updateMenu} className={currentLink}>Home</NavLink></li>
                <li className='text-center hamburger-link' onClick={updateMenu}>
                    <ShowOnLogin>
                        <NavLink to="/order-history" className={currentLink}>
                            My Orders
                        </NavLink>
                    </ShowOnLogin>
                </li>
                <li onClick={updateMenu} className="flex justify-center items-center">
                        <NavLink to="/cart" className={currentLink}>
                            <FaShoppingCart size={20} />
                        </NavLink>
                    </li>
                <ShowOnLogout>
                    <li onClick={updateMenu} className='text-center hamburger-link'>
                        <NavLink to="/login" className={currentLink}>Login</NavLink>
                    </li>
                    <li onClick={updateMenu} className='text-center hamburger-link'>
                        <NavLink to="/register" className={currentLink}>Register</NavLink>
                    </li>
                </ShowOnLogout>
                <li onClick={updateMenu} className='text-center hamburger-link'>
                   <ShowOnLogin>
                      <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                   </ShowOnLogin>
                </li>
            </ul>
          </nav>
        </>
      )
    }

export default Hamburger
