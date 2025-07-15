// 메인 추천리스트 요청 api
export const requestLikeList = async (memId, token) => {
    const res = await fetch('http://localhost:8888/spark/api/me/likeList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ memId }),
        
    });
    console.log("보내는 memId:", memId);
    console.log("보내는 JSON.stringify:", JSON.stringify({ memId }));

    if (!res.ok) {
        throw new Error('좋아요 리스트를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};