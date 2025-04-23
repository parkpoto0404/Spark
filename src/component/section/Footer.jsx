import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import {Link,useLocation, useNavigate} from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const insertInfoPage = location.pathname === '/insertInfo';


  return (
    <>
      <div className='footer'>
        <Link to='/'><AiFillHome className='footerImg'/></Link> 
        <Link to='/like'><FaHeart className='footerImg'/></Link>
        <Link to='/chat'><IoIosChatbubbles className='footerImg'/></Link>
        <Link to='/myPage'><FaUser className='footerImg'/></Link>
      </div>
      {insertInfoPage &&(
        <div className='footer'>
          <Link to='#'><AiFillHome className='footerImg'/></Link> 
          <Link to='#'><FaHeart className='footerImg'/></Link>
          <Link to='#'><IoIosChatbubbles className='footerImg'/></Link>
          <Link to='#'><FaUser className='footerImg'/></Link>
        </div>
      )}
    </>
  )
}

export default Footer
