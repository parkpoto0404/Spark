import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignupPage = location.pathname === '/signup';

  return (
    <div className='header'>
      {isSignupPage && (
        <div style={{display: 'flex'}}>
          <div className='back-btn'>
            <span onClick={() => navigate(-1)}> 
              <h2>〈 </h2> 
            </span>
          </div>
          <span style={{alignContent: 'center'}}><h2>회원가입</h2></span>
        </div>
      )}
      {/* 다른 헤더 내용도 여기에 추가 가능 */}
    </div>
  );
};

export default Header;