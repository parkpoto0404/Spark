import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Mypage = () => {

  const navigate = useNavigate();
  // 로그인 상태, 사용자 정보 상태 모두 초기화할 수 있도록 useAuthContext에서 가져옴
  const { setLoginCheck, setMemberInfo, setMemId } = useAuthContext();

  // 로그아웃 함수
  const logingOut = async () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      try {
        // 서버에 로그아웃 요청
        const token = localStorage.getItem('jwt');
        const res = await fetch('http://localhost:8888/spark/api/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        // 응답 상태 및 메시지 확인
        let result = {};
        try {
          result = await res.json();
        } catch (e) {}
        console.log('로그아웃 응답 status:', res.status, 'body:', result);

        if (res.ok) {
          // 1. 토큰 등 모든 사용자 정보 localStorage에서 제거
          localStorage.removeItem('jwt'); // access token 제거
          localStorage.removeItem('refreshToken'); // refresh token 제거
          // 2. Context의 사용자 상태도 모두 초기화
          setLoginCheck(false); // 로그인 상태 false로 초기화
          setMemberInfo(null);  // 사용자 정보 초기화
          setMemId(null);       // memId 초기화
          // 3. 로그인 페이지로 이동
          navigate('/login');
          console.log('로그아웃 성공');
        } else {
          alert('로그아웃 실패: ' + (result.message || res.status));
          console.log('로그아웃 실패');
        }
      } catch (err) {
        console.error('로그아웃 요청 실패:', err);
        alert('로그아웃 요청 실패: ' + err.message);
      }
    }
  };

  return (
    <div>
        <div className='myPage-info'>
          <div className=''>
            <span></span>
          </div>
        </div>
       <button onClick={logingOut}>로그아웃</button>
    </div>
  )
}

export default Mypage
