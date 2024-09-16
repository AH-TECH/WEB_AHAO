import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Drawer from './Drawer'
import { Outlet, useNavigate } from 'react-router-dom'
import './styles.css'; 
const index = () => {
  const navigate = useNavigate();

    useEffect(() => {
      if (window.location.pathname === '/') {
        navigate('/select1');
      }
    }, []);
  return (
    <>
    <Navbar/>
    <div className='flex-navbar-main'>
    <Drawer/>
    <div className='w-full'>

    <Outlet/>
    </div>
    </div>
    </>
  )
}

export default index