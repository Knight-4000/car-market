import React from 'react'
import './navbar.scss';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";

const currentLink = ({ isActive }) => (isActive ? 'current' : 'standard');

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className="nav">
      <div className="user">
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={currentLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-autos" className={currentLink}>
              All Autos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-auto" className={currentLink}>
              Add Auto
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={currentLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;