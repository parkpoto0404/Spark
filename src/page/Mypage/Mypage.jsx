import { useAuthContext } from '../../context/AuthContext';

const Mypage = () => {
  const { setLoginCheck, setMemberInfo, setMemId } = useAuthContext();

  // 로그아웃 함수
  const handleLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8888/spark/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      let result = {};
      try {
        result = await res.json();
      } catch (e) {}

      if (res.ok) {
        // 1. 로컬스토리지 토큰 제거
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        // 2. Context 상태 초기화
        setLoginCheck(false);
        setMemberInfo(null);
        setMemId(null);
        // 3. 로그인 페이지로 이동
        window.location.href = '/login';
      } else {
        alert('로그아웃 실패: ' + (result.message || res.status));
      }
    } catch (err) {
      alert('로그아웃 요청 실패: ' + err.message);
    }
  };

  return (
    <div>
      <div className='myPage-info'>
        <div>
          <span></span>
        </div>
      </div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Mypage;
