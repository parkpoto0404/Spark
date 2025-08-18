import { authFetch } from '../../../utils/authFetch';

// 채팅 리스트 불러오기 API
export const requestChatList = async (memId) => {
  const res = await authFetch('http://localhost:8888/spark/chat/chatList', {
    method: 'POST',
    body: JSON.stringify({ memId }),
  });

  if (!res.ok) {
    throw new Error('채팅 리스트를 불러오는 데 실패했습니다.');
  }

  return await res.json();
};
