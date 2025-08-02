import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState(null);
  const [loading, setLoading] = useState(true); // 화면 렌더링 지연하려는 용도!!
  //loading 상태관리 없이 초기 로딩 시 loginCheck는 null이므로 로그아웃 상태로 잘못 처리됨

  const [memberInfo, setMemberInfo] = useState(null); // 로그인 정보
  const [step,setStep] = useState(1); // 정보입력 순서관리
  const [memId,setMemId] = useState(null);
  

  

  const initAuth = async () => {
    const accessToken = localStorage.getItem('jwt');

    if (!accessToken) {
      console.log('accessToken 없음');
      setLoginCheck(false);
      setLoading(false);
      return; // return 추가로 아래 코드 실행 방지
    }

    try {
      const res = await fetch('http://localhost:8888/spark/api/validate', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log('validate 응답:', data);
      console.log('data.valid:', data.valid);
      console.log('data.memberDto:', data.memberDto);
      console.log('data.memberDto?.memId:', data.memberDto?.memId);

      if (res.ok && data.valid) {
        setLoginCheck(true);
        setMemberInfo(data.memberDto);
        setMemId(data.memberDto?.memId); // 옵셔널 체이닝
        console.log("멤버아이디", data.memberDto?.memId);
      } else {
        localStorage.removeItem('jwt');
        setLoginCheck(false);
        console.log('validate 실패 또는 만료:', data);
      }
    } catch (err) {
      localStorage.removeItem('jwt');
      setLoginCheck(false);
      console.log('validate 에러:', err);
    } finally {
      // 렌더링 타이밍 지연
      await new Promise((res) => setTimeout(res, 100));
      setLoading(false);
    }
  };




    useEffect(() => {

      initAuth();

    }, []);






  return (
    <AuthContext.Provider value={{ loginCheck, 
                                   loading,
                                   initAuth,
                                   setLoginCheck,
                                   memberInfo,
                                   setMemberInfo,
                                   step,
                                   setStep,
                                   memId,
                                   setMemId 
                                     }}>  
                                   
                                   {children} </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);