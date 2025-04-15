import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Mypage = () => {

  const navigate = useNavigate();
  const { setLoginCheck } = useAuthContext();
  const refreshToken = localStorage.getItem('refreshToken');

  
  const logingOut= async ()=>{
    
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    
    if(confirmLogout){
      
      try{
        const res = await fetch('http://localhost:8888/spark/api/logout', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json', // json 형식으로 보내기
          },
          body : JSON.stringify({refreshToken}),
          credentials : 'include'
  
        });

        if(res.ok){
          // 서버에서 처리 성공
          localStorage.removeItem('jwt'); // access token 제거
          localStorage.removeItem('refreshToken'); // refresh token 제거
          setLoginCheck(false); // 로그인 상태 false로 초기화
          navigate('/login'); // 로그인 페이지로 리다이렉트
          console.log('로그인 성공')
        } else {
          console.log('로그아웃 실패');
        }
  
      } catch (err){
        console.error('로그아웃 요청 실패:', err);
      }

    };

  };
  


  return (
    <div>
       <button onClick={logingOut}>로그아웃</button>
    </div>
  )
}

export default Mypage
   