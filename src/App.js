
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


import { useState } from 'react';


function HeaderLayout() {
  const location = useLocation();
  //console.log(location.pathname)
  return location.pathname !== "/login" ? <Header /> : null;
}

function App() {

  const [loginCheck, setLoginCheck] = useState(false); // 수정변수도 속성데이터로 보낼 수 있다!


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
