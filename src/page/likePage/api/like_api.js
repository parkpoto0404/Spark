import { authFetch } from '../../../utils/authFetch';

// 메인 추천리스트 요청 api
export const requestLikeList = async (memId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/likeList', {
        method: 'POST',
        body: JSON.stringify({ memId }),
    });
    console.log("보내는 memId:", memId);
    console.log("보내는 JSON.stringify:", JSON.stringify({ memId }));

    if (!res.ok) {
        throw new Error('좋아요 리스트를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};