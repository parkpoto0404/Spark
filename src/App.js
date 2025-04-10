
import { BrowserRouter, Routes, Route ,Navigate, useLocation} from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Pwdfind from './page/Pwdfind';
import Signup from './page/Signup';
import Like from './page/Like';
import Mypage from './page/Mypage';
import Chat from './page/Chat';


import Not from './page/Not';
import Header from './component/section/Header';
import Main from './component/section/Main';
import Footer from './component/section/Footer';


import { useState,useEffect } from 'react';


function HeaderLayout() {
  const location = useLocation();
  //console.log(location.pathname)
  return location.pathname !== "/login" ? <Header /> : null; 
  // 로그인화면일때/아닐때 나오는 헤더부분을 지정하는 구문
}


function App() {

  const [loginCheck, setLoginCheck] = useState(false); // 수정변수도 속성데이터로 보낼 수 있다!
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('jwt');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (!accessToken) {
      setLoginCheck(false);
      setLoading(false);
      return;
    }
  
    // 액세스 토큰 유효성 검사
    fetch('http://localhost:8888/spark/api/validate', {
      method: 'GET',
      credentials: 'include', // 쿠키 포함
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setLoginCheck(true);
        } else {
          // 액세스 토큰 만료시 리프레시 토큰을 사용해 새 액세스 토큰 발급
          fetch('http://localhost:8888/spark/api/refresh', {
            method: 'POST',
            credentials: 'include', // 쿠키 포함
            headers: {
              'Authorization': `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(data => {
              if (data.accessToken) {
                localStorage.setItem('jwt', data.accessToken);  // 새 액세스 토큰 저장
                setLoginCheck(true);
              } else {
                setLoginCheck(false);
                localStorage.removeItem('jwt');
                localStorage.removeItem('refreshToken');
              }
            })
            .catch(() => {
              setLoginCheck(false);
              localStorage.removeItem('jwt');
              localStorage.removeItem('refreshToken');
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setLoginCheck(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);




  return (
    <div className="App">
      
      <BrowserRouter>
          <HeaderLayout/>
          <Main>
            <Routes>
              <Route path='/' element={ loading ? <div>로딩 중...</div> : loginCheck ? <Home /> : <Navigate to="/login" replace />} />
              <Route path='/login' element={<Login loginCheck={setLoginCheck} />} /> 
              <Route path='/pwdfind' element={<Pwdfind />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/like' element={loginCheck ? <Like /> : <Navigate to="/login" replace/>} />
              <Route path='/mypage' element={loginCheck ? <Mypage /> : <Navigate to="/login" replace/>} />
              <Route path='/chat' element={loginCheck ? <Chat /> : <Navigate to="/login" replace/>} />
              <Route path='*' element={<Not />} />
            </Routes>
          </Main>
          <Footer loginCheck={loginCheck}/>
        </BrowserRouter>

    </div>
  );
}

export default App;
