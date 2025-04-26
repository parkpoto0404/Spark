import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { step , setStep } = useAuthContext();
  //const { firstPage,setFirstPage } = useAuthContext(); // step 별 에니메이션 방지용


  const isSignupPage = location.pathname === '/signup';
  const insertInfoPage = location.pathname === '/insertInfo';


  const handleBack = () => {
    setStep(prev => prev > 1 ? prev - 1 : prev); // 1보다 클 때만 감소
    //setFirstPage(true);
  }

  return (
    <div className='header'>
      {isSignupPage&& (
        <div style={{display: 'flex'}}>
          <div className='back-btn'>
            <span onClick={() => navigate(-1)}> 
              <h2>〈 </h2> 
            </span>
          </div>
          <span style={{alignContent: 'center'}}><h2>회원가입</h2></span>
        </div>
      )}
      
      {insertInfoPage&& (
        <div style={{display: 'flex'}}>
          <div className='back-btn' >
            <span onClick={handleBack}> 
              <h2>〈 </h2> 
            </span>
          </div>
          <span style={{alignContent: 'center'}}><h4> 작성완료까지 {step}/10</h4></span>
          <span style={{alignContent: 'center'}}></span>
        </div>
      )}
      
      


    </div>
    
  );
};

export default Header;