import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext'; 
import { useLocation } from 'react-router-dom';

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
import PrivateRoute from './component/route/PrivateRoute';



function HeaderLayout() {
  const location = useLocation();
  return location.pathname !== "/login" ? <Header /> : null;
}

function AppRoutes() {
  const { loginCheck, loading } = useAuthContext();

  // 🔥 핵심: loginCheck 판단이 끝나기 전에는 라우터 자체 렌더링 안함
  if (loading || loginCheck === null) {
    return <div>앱 초기화 중...</div>;
  }


  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/pwdfind' element={<Pwdfind />} />
        <Route path='/signup' element={<Signup />} />
      <Route
        path='/'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Home />
          </PrivateRoute>
        }
      />
        <Route
        path='/like'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Like />
          </PrivateRoute>
        }
      />
      <Route
        path='/mypage'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Mypage />
          </PrivateRoute>
        }
      />
      <Route
        path='/chat'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<Not />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderLayout />
        <Main>
          <AppRoutes />
        </Main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
