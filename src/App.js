import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

import { useState, useEffect } from 'react';

function HeaderLayout() {
  const location = useLocation();
  return location.pathname !== "/login" ? <Header /> : null;
}

function App() {
  const [loginCheck, setLoginCheck] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('jwt');

    if (!accessToken) {
      setLoginCheck(false);
      setLoading(false);
      return;
    }

    fetch('http://localhost:8888/spark/api/validate', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(async (data) => {
        if (data.valid) {
          setLoginCheck(true);
        } else {
          // 🔧 accessToken이 만료되었을 경우 refresh 요청
          try {
            const res = await fetch('http://localhost:8888/spark/api/refresh', {
              method: 'POST',
              credentials: 'include',
            });
            const refreshData = await res.json();
            if (refreshData.accessToken) {
              localStorage.setItem('jwt', refreshData.accessToken); // 🔧 새 토큰 저장
              setLoginCheck(true);
            } else {
              setLoginCheck(false);
              localStorage.removeItem('jwt');
            }
          } catch (error) {
            setLoginCheck(false);
            localStorage.removeItem('jwt');
          }
        }
      })
      .catch(() => {
        setLoginCheck(false);
        localStorage.removeItem('jwt');
      })
      .finally(() => {
        setLoading(false); // 🔧 모든 토큰 처리 후에만 로딩 false
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderLayout />
        <Main>
          <Routes>
            <Route
              path='/'
              element={
                loading ? (
                  <div>로딩 중...</div> // 🔧 로딩 중일 때는 화면 전환 X
                ) : loginCheck ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path='/login' element={<Login loginCheck={setLoginCheck} />} />
            <Route path='/pwdfind' element={<Pwdfind />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/like' element={loginCheck ? <Like /> : <Navigate to="/login" replace />} />
            <Route path='/mypage' element={loginCheck ? <Mypage /> : <Navigate to="/login" replace />} />
            <Route path='/chat' element={loginCheck ? <Chat /> : <Navigate to="/login" replace />} />
            <Route path='*' element={<Not />} />
          </Routes>
        </Main>
        <Footer loginCheck={loginCheck} />
      </BrowserRouter>
    </div>
  );
}

export default App;