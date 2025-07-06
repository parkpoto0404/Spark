import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { useLocation } from 'react-router-dom';

import Home from './page/home/Home';
import Login from './page/login/Login';
import Pwdfind from './page/pwdfind/Pwdfind';
import Signup from './page/signUp/Signup';
import Like from './page/like/Like';
import Feed from './page/feed/Feed';
import Mypage from './page/mypage/Mypage';
import Chat from './page/chat/Chat';
import InsertInfo from './page/InsertInfo/InsertInfo';
import Not from './page/Not';
import Header from './component/section/Header';
import Main from './component/section/Main';
import Footer from './component/section/Footer';
import PrivateRoute from './component/route/PrivateRoute';
import Detail from './page/detail/Detail';



function HeaderLayout() {
  const location = useLocation();
  return location.pathname !== "/login" ? <Header /> : null;
}



function AppRoutes() {
  const { loginCheck, loading } = useAuthContext();


  // loginCheck 판단이 끝나기 전에는 라우터 자체 렌더링 안함
  if (loading || loginCheck === null) {
    return <div className="loading-spinner"></div>;
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
        path='/feed'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Feed />
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

      <Route
        path='/insertInfo'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <InsertInfo />
          </PrivateRoute>
        }
      />

      <Route
        path='/detail'
        element={
          <PrivateRoute loginCheck={loginCheck} loading={loading}>
            <Detail />
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
