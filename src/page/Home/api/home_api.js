import { authFetch } from '../../../utils/authFetch';

// 메인 추천리스트 요청 api
export const requestUserList = async (memberInfo) => {

    const res = await authFetch('http://localhost:8888/spark/api/recommend', {
        method: 'POST',
        body: JSON.stringify(memberInfo),
    });

    if (!res.ok) {
        throw new Error('추천 리스트를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};



// x버튼 : 추천 제외 요청 api
export const requestRecommendDelete = async (hiddenId, hiddenTarget) => {
  const res = await authFetch('http://localhost:8888/spark/api/recommendDelete', {
    method: 'POST',
    body: JSON.stringify({ hiddenId, hiddenTarget }),
  });

  if (!res.ok) {
    throw new Error('추천 제외 요청 실패');
  }
};


// ♥ 버튼 : 좋아요 신청 api
export const requestLike = async (requestId, responseId) => {
  const res = await authFetch('http://localhost:8888/spark/api/like', {
    method: 'POST',
    body: JSON.stringify({ requestId, responseId }),
  });

  if (!res.ok) {
    throw new Error('좋아요 요청 실패');
  }
};

// ★ 버튼 : 관심목록 추가 api
export const requestUserInterest = async (imUser, imTarget) => {
  const res = await authFetch('http://localhost:8888/spark/api/interestMem', {
    method: 'POST',
    body: JSON.stringify({ imUser, imTarget }),
  });

  if (!res.ok) {
    throw new Error('관심목록 요청 실패');
  }
};