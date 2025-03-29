import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import Pwdfind from './page/Pwdfind';
import Signup from './page/Signup';




function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
            <Routes>
              <Route path='/main' element={<Main />} />
              <Route path='/login' element={<Login />} />
              <Route path='/pwdfind' element={<Pwdfind />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
