import React, { useRef } from 'react'
import { useState } from "react";
// useState 의 수정값은 즉시 업데이트가 되지 않아 바로 console.log 로 찍어봐도 값을 찾지 못한다.

import { useNavigate , Link} from "react-router-dom";

const Login = ({loginCheck}) => {


  const [id , setId] = useState(""); 
  const [pwd , setPwd] = useState("");

  const navi = useNavigate();
  //const idCheck = useRef("");
  //const pwdCheck = useRef("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8888/spark/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memId : id, memPwd: pwd }),
      });

      if (!res.ok) {
        throw new Error('로그인 실패');
      }

      const data = await res.json();
      const token = data.token.accessToken;

      
      // JWT를 localStorage에 저장
      localStorage.setItem('jwt', token);
      console.log('저장된 jwt:', localStorage.getItem('jwt'));
      // 로그인 상태 변경
      loginCheck(true);

      alert('로그인 성공!');
      navi('/');
      console.log('토큰 : ',token,'데이터 : ',data)

    } catch (err) {
      alert('아이디 혹은 비밀번호가 잘못되었습니다!');
      setId('');
      setPwd('');
    }



  }
  
  return (
    <div className='login_container'>

      <h2>로그인</h2>

      <form id="loginForm" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="userId" className='label_only'>휴대폰 번호</label>
          <input  type="text" 
                  id='userId'
                  name='id' 
                  placeholder='휴대폰번호 (- 없이 입력해주세요 )' 
                  required
                  value={id} 
                  
                  onChange={(e) => setId(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="userPwd" className='label_only'>비밀번호</label>
          <input type="password" 
                  id='userPwd'
                  name='pwd' 
                  placeholder='비밀번호' 
                  required
                  value={pwd} 
                  
                  onChange={(e)=> setPwd(e.target.value) }
          />
        </p>

          <button type="submit">로그인</button>
        </form>

        <div class="link-group">
          <Link to="/signup">회원가입</Link>
          <Link to="/pwdfind">비밀번호 찾기</Link>
        </div>

     
    </div>
  )
}

export default Login
