
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
  const [loading, setLoading] = useState(true); // 로딩 완료 여부 추가

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setLoginCheck(true);
    }
    setLoading(false); // 로딩 완료 표시
  }, []);


  
  if (loading) return null; // ⭐️ 로딩 중엔 아무 것도 렌더링하지 않음 (혹은 로딩 화면)


  return (
    <div className="App">
      
      <BrowserRouter>
          <HeaderLayout/>
          <Main>
            <Routes>
              <Route path='/' element={ loginCheck ? <Home /> : <Navigate to="/login" />} />
              <Route path='/login' element={<Login loginCheck={setLoginCheck} />} /> 
              <Route path='/pwdfind' element={<Pwdfind />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/like' element={<Like />} />
              <Route path='/mypage' element={<Mypage />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='*' element={<Not />} />
            </Routes>
          </Main>
          <Footer/>
        </BrowserRouter>

    </div>
  );
}

export default App;
