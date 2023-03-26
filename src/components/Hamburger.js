import { useState }  from 'react';
import './hamburger.css';
import { useNavigate, Link } from 'react-router-dom'

const Hamburger = () => {
    const navigate = useNavigate()
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
        <div className="burger-menu d-lg-none" onClick={updateMenu}>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
        </div> 

        <nav className={sidebar ? 'nav-menu active flex flex-col ' : 'nav-menu flex flex-col '}>
            <ul className='nav-menu-items block' onClick={showSidebar}>
                <li className='text-center'><Link to="/" className='px-2' onClick={updateMenu} >Home</Link></li>
                <li className='text-center'><Link to="/contact" className='px-2' onClick={updateMenu} >Contact</Link></li>
            </ul>
          </nav>
    </>
  )
}

export default Hamburger
