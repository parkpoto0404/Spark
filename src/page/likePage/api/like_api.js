import { authFetch } from '../../../utils/authFetch';

// 보낸 좋아요 리스트 api
export const requestSendLikeList = async (memId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/send/likeList', {
        method: 'POST',
        body: JSON.stringify({ memId }),
    });

    if (!res.ok) {
        throw new Error('보낸 좋아요 리스트를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};

// 관심목록 요청 api
export const requestInterestList = async (memId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/interestList', {
        method: 'POST',
        body: JSON.stringify({ memId }),
    });

    if (!res.ok) {
        throw new Error('관심목록을 가져오는 데 실패했습니다.');
    }

    return await res.json();
};

// 받은 좋아요 리스트 요청 api
export const requestGetLikeList = async (memId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/get/likeList', {
        method: 'POST',
        body: JSON.stringify({ memId }),
    });

    if (!res.ok) {
        throw new Error('받은 좋아요를 가져오는 데 실패했습니다.');
    }

    return await res.json();
};


// 받은 좋아요 수락 api
export const requestLikeYes = async (requestId,responseId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/likeYes', {
        method: 'POST',
        body: JSON.stringify({ requestId, responseId }),
    });
    console.log('requestId,responseId', requestId, responseId);
    console.log('res', res);

    if (!res.ok) {
        throw new Error('받은 좋아요 수락요청 실패했습니다.');
    }

    return await res.json();
};

// 받은 좋아요 거절 api
export const requestLikeNo = async (requestId,responseId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/likeNo', {
        method: 'POST',
        body: JSON.stringify({ requestId, responseId }),
    });
    console.log('requestId,responseId', requestId, responseId);
    console.log('res', res);

    if (!res.ok) {
        throw new Error('받은 좋아요 거절요청 실패했습니다.');
    }

    return await res.json();
};

// 관심목록 좋아요 요청 api
export const requestInterestLikeSend = async (imUser,imTarget) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/interestLikeSend', {
        method: 'POST',
        body: JSON.stringify({ imUser, imTarget }),
    });
    console.log('imUser,imTarget', imUser, imTarget);
    console.log('res', res);

    if (!res.ok) {
        throw new Error('관심 목록에 좋아요 전송 실패했습니다.');
    }

    return await res.json();
};

// 관심목록 삭제  api
export const requestInterestDelete = async (imUser,imTarget) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/interestDelete', {
        method: 'POST',
        body: JSON.stringify({ imUser, imTarget }),
    });
    console.log('imUser,imTarget', imUser, imTarget);
    console.log('res', res);

    if (!res.ok) {
        throw new Error('관심 목록에 좋아요 전송 실패했습니다.');
    }

    return await res.json();
};

// 보낸 좋아요 삭제  api
export const requestSendLikeDelete = async (requestId,responseId) => {
    const res = await authFetch('http://localhost:8888/spark/api/me/likeList/delete', {
        method: 'POST',
        body: JSON.stringify({ requestId, responseId }),
    });
    console.log('requestId,responseId', requestId, responseId);
    console.log('res', res);

    if (!res.ok) {
        throw new Error('보낸 좋아요 삭제 실패했습니다.');
    }

    return await res.json();
};