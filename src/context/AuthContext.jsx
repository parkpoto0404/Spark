import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

let refreshPromise = null; // 리프레시 중이면 공유할 Promise

export const AuthProvider = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberInfo, setMemberInfo] = useState(null); // 로그인 정보
  const [step,setStep] = useState(1); // 정보입력 순서관리
  const [firstPage , setFirstPage ] = useState(false); // step2 에서 버튼클릭시 애니메이션 효과 방지

  

  const initAuth = async () => {
    const accessToken = localStorage.getItem('jwt');
    console.log('JWT 초기값:', accessToken);

    if (!accessToken) {
      console.log('accessToken 없음');
      setLoginCheck(false);
      setLoading(false);
      return;
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

      if (res.ok && data.valid) {
        setLoginCheck(true);
        setMemberInfo(data.memberDto)
      } else {
        console.log('토큰 만료 → 리프레시 시도');

        // refresh 요청이 이미 진행 중이라면 대기
        if (!refreshPromise) {
            refreshPromise = fetch('http://localhost:8888/spark/api/refresh', {
            method: 'POST',
            credentials: 'include',
          }).then((res) => res.json());
        }

        const refreshData = await refreshPromise;
        refreshPromise = null; // Promise 초기화

        if (refreshData.accessToken) {
          console.log('새 토큰 저장:', refreshData.accessToken);
          localStorage.setItem('jwt', refreshData.accessToken);
          setLoginCheck(true);
        } else {
          console.log('refresh 실패');
          localStorage.removeItem('jwt');
          setLoginCheck(false);
        }
      }
    } catch (err) {
      console.error('예외 발생:', err);
      localStorage.removeItem('jwt');
      setLoginCheck(false);
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
                                   setLoginCheck,
                                   memberInfo,
                                   setMemberInfo,
                                   step,
                                   setStep,
                                   firstPage,
                                   setFirstPage  }}>  
                                   
                                   {children} </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);