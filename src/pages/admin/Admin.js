import React from 'react'
import './admin.scss'
import Navbar from '../../components/admin/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from "../admin/home/Home";
import ViewAutos from '../../components/admin/ViewAutos/ViewAutos';
import AddAuto from '../../components/admin/addAuto/AddAuto';
import Orders from '../../components/admin/orders/Orders';

const Admin = () => {
  return (
    <>
      <div className='admin'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='content'>
          <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-autos" element={<ViewAutos />} />
          <Route path="add-auto" element={<AddAuto />} />
          <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin
