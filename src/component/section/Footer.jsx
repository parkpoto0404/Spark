import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { MdFeed } from "react-icons/md";
import {Link,useLocation} from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  

  const insertInfoPage = location.pathname === '/insertInfo';


  return (
    <>
      <div className='footer'>
        <Link to='/'><AiFillHome className='footerImg'/></Link> 
        <Link to='/like'><FaHeart className='footerImg'/></Link>
        <Link to='/feed'><MdFeed className='footerImg'/></Link>
        <Link to='/chat'><IoIosChatbubbles className='footerImg'/></Link>
        <Link to='/myPage'><FaUser className='footerImg'/></Link>
      </div>
      {insertInfoPage &&(
        <div className='footer'>
          <Link to='#'><AiFillHome className='footerImg'/></Link> 
          <Link to='#'><FaHeart className='footerImg'/></Link>
          <Link to='#'><MdFeed className='footerImg'/></Link>
          <Link to='#'><IoIosChatbubbles className='footerImg'/></Link>
          <Link to='#'><FaUser className='footerImg'/></Link>
        </div>
      )}
    </>
  )
}

export default Footer
