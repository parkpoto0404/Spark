import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext를 사용하여 로그인 상태를 관리합니다.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 여부
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const accessToken = localStorage.getItem('jwt'); // JWT 토큰을 localStorage에서 가져옴

    if (!accessToken) {
      setLoginCheck(false);
      setLoading(false);
      return; // 토큰이 없으면 바로 종료
    }

    const validateToken = async () => {
      
      try {
        const res = await fetch('http://localhost:8888/spark/api/validate', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('유효하지 않은 토큰');
        }

        const data = await res.json();

        if (data.valid) {
          setLoginCheck(true);
        } else {
          // 토큰 만료 시 refresh 요청
          try {
            const refreshRes = await fetch('http://localhost:8888/spark/api/refresh', {
              method: 'POST',
              credentials: 'include',
            });

            if (!refreshRes.ok) {
              throw new Error('리프레시 토큰 요청 실패');
            }

            const refreshData = await refreshRes.json();
            if (refreshData.accessToken) {
              localStorage.setItem('jwt', refreshData.accessToken);
              setLoginCheck(true);
            } else {
              setLoginCheck(false);
              localStorage.removeItem('jwt');
            }
          } catch (err) {
            console.error('리프레시 토큰 오류:', err);
            setLoginCheck(false);
            localStorage.removeItem('jwt');
          }
        }
      } catch (err) {
        console.error('토큰 유효성 검사 오류:', err);
        setLoginCheck(false);
        localStorage.removeItem('jwt');
      } finally {
        setLoading(false); // 모든 처리가 끝나면 로딩을 false로 설정
      }
    };

    validateToken();
  }, []); // 페이지 로드 시 한 번만 실행

  return (
    <AuthContext.Provider value={{ loginCheck, setLoginCheck, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
