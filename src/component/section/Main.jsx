import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Main = ({children}) => {

  const location = useLocation();
  const loginPage = location.pathname === '/login';


  return (
    <div className={`${loginPage ? 'main-login' : 'main'}`} >
      {children}
    </div>
  )
}

export default Main
