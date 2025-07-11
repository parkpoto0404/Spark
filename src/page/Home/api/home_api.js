
// 메인 추천리스트 요청 api
export const requestUserList = async (memberInfo, token) => {
    const res = await fetch('http://localhost:8888/spark/api/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(memberInfo),
    });

    if (!res.ok) {
        throw new Error('추천 리스트를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};



// x버튼 : 추천 제외 요청 api
export const requestRecommendDelete = async (hiddenId, hiddenTarget, token) => {
  const res = await fetch('http://localhost:8888/spark/api/recommendDelete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ hiddenId, hiddenTarget }),
  });

  if (!res.ok) {
    throw new Error('추천 제외 요청 실패');
  }
};


// ♥ 버튼 : 좋아요 신청 api
export const requestLike = async (requestId, responseId, token) => {
  const res = await fetch('http://localhost:8888/spark/api/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ requestId, responseId }),
  });

  if (!res.ok) {
    throw new Error('좋아요 요청 실패');
  }
};