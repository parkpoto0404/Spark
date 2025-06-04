import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { step, setStep } = useAuthContext();

  const { recommendations, scrollY } = location.state || {}; // 메인에서 봤던 리스트와 스크롤위치

  const isSignupPage = location.pathname === '/signup';
  const insertInfoPage = location.pathname === '/insertInfo';
  const mainPage = location.pathname === '/';
  const detailPage = location.pathname === '/detail';

  



  const goBackToHome = () => { // 상세보기에서 메인으로 뒤로가기 핸들러

    navigate("/", {
      state: {
        recommendations: recommendations,
        scrollY: scrollY,
      },
    });
    sessionStorage.setItem('backFromDetail', 'true');
  };

  const handleBack = () => { // 정보입력페이지 뒤로가기 핸들러
    setStep(prev => prev > 1 ? prev - 1 : prev); // 1보다 클 때만 감소

  }

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
            <span onClick={() => goBackToHome()}>
              <h2>〈 </h2>
            </span>
          </div>
          <span style={{ alignContent: 'center' }}><h2>상세보기</h2></span>
        </div>
      )}

      {mainPage && (
        <div style={{ display: 'flex' }}>
          <span style={{ alignContent: 'center' }}><h2>소개팅 추천</h2></span>
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