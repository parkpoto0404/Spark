import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Main = ({children}) => {

  const location = useLocation();
  const loginPage = location.pathname === '/login';
  const chatRoomPage = location.pathname.startsWith('/chat/room');


  return (
    <div className={`${loginPage ? 'main-login' : 'main'} ${chatRoomPage ? 'chat-room' : ''}`} >
      {children}
    </div>
  )
}

export default Main
