// src/utils/authFetch.js
// 인증 토큰 자동 갱신 fetch 함수 (공통 유틸)

export async function authFetch(url, options = {}) {
  let accessToken = localStorage.getItem('jwt');
  if (!options.headers) options.headers = {};
  options.headers['Authorization'] = `Bearer ${accessToken}`;
  options.headers['Content-Type'] = 'application/json';
  options.credentials = 'include';

  let res = await fetch(url, options);

  // 토큰이 만료된 경우(401 또는 403)
  if (res.status === 401 || res.status === 403) {
    // refresh 요청
    const refreshRes = await fetch('http://localhost:8888/spark/api/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    const refreshData = await refreshRes.json();

    if (refreshData.accessToken) {
      // 새 토큰 저장
      localStorage.setItem('jwt', refreshData.accessToken);
      // 새 토큰으로 다시 요청
      options.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
      res = await fetch(url, options);
    } else {
      // refresh도 실패하면 로그아웃 처리
      localStorage.removeItem('jwt');
      throw new Error('로그인 만료');
    }
  }
  return res;
}
