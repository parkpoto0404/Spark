import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { step, setStep } = useAuthContext();

  const isSignupPage = location.pathname === '/signup';
  const insertInfoPage = location.pathname === '/insertInfo';
  const mainPage = location.pathname === '/';
  const detailPage = location.pathname === '/detail';
  const likePage = location.pathname === '/like';
  const myPage = location.pathname === '/myPage';
  const chatPage = location.pathname === '/chat';
  const chatRoomPage = location.pathname.startsWith('/chat/room/');

  // 상세보기에서 뒤로가기(탭 복귀)
  const goBackToLikeTab = () => {
    if (location.state && location.state.fromTab) {
      navigate('/like', { state: { fromTab: location.state.fromTab } });
    } else {
      navigate(-1);
    }
  };

  // 정보입력페이지 뒤로가기 핸들러
  const handleBack = () => {
    setStep(prev => prev > 1 ? prev - 1 : prev);
  };

  return (
    <div className='header'>
      {isSignupPage && (
        <div style={{ display: 'flex' }}>
          <div className='back-btn'>
            <span onClick={() => navigate(-1)}>
              <h2>〈 </h2>
            </span>
          </div>
          <span style={{ alignContent: 'center' }}><h2>회원가입</h2></span>
        </div>
      )}

      {detailPage && (
        <div style={{ display: 'flex' }}>
          <div className='back-btn'>
            <span onClick={goBackToLikeTab}>
              <h2>〈 </h2>
            </span>
          </div>
          <span style={{ alignContent: 'center' }}><h2>상세보기</h2></span>
        </div>
      )}

      {chatRoomPage && (
        <div style={{ display: 'flex' }}>
          <div className='back-btn'>
            <span onClick={() => navigate(-1)}>
              <h2>〈 </h2>
            </span>
          </div>
          <span style={{ alignContent: 'center' }}><h2>채팅방</h2></span>
        </div>
      )}

      {(mainPage || likePage || myPage || chatPage) && (
        <div style={{ display: 'flex' }}>
          <span style={{ alignContent: 'center' }}>
            <span style={{ marginLeft : "175px"}}>
              <img src="/spark_logo2.png" alt="" style={{ width : "90px"}}/>
            </span>
          </span>
        </div>
      )}
      

      {insertInfoPage && (
        <div style={{ display: 'flex' }}>
          <div className='back-btn' >
            <span onClick={handleBack}>
              <h2>〈 </h2>
            </span>
          </div>
          <span style={{ alignContent: 'center' }}><h4> 작성완료까지 {step}/11</h4></span>
          <span style={{ alignContent: 'center' }}></span>
        </div>
      )}
    </div>

  );
};

export default Header;