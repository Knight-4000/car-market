import { useState }  from 'react';
import './hamburger.css';
import { NavLink, Link } from 'react-router-dom'

const currentLink = ({ isActive }) => (isActive ? `current px-2` : "px-2")

const Hamburger = ({onCurrentLink}) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

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
  return (
    <>
        <div className="burger-menu hidden-large" onClick={updateMenu}>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
        </div> 

        <nav className={sidebar ? 'nav-menu active flex flex-col ' : 'nav-menu flex flex-col '}>
            <ul className='nav-menu-items block' onClick={showSidebar}>
                <li className='text-center'><NavLink to="/" onClick={updateMenu} className={currentLink}>Home</NavLink></li>
                <li className='text-center'><NavLink to="/contact" onClick={updateMenu} className={currentLink}>Contact</NavLink></li>
            </ul>
          </nav>
    </>
  )
}

export default Hamburger
