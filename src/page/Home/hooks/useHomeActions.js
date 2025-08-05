import { useState } from 'react';
import { requestUserList} from '../api/home_api';

export function useHomeActions(memberInfo) {
  const [recommendations, setRecommendations] = useState([]);

  // 추천 리스트 요청 핸들러
  const fetchRecommendations = async () => {
    try {
      const data = await requestUserList(memberInfo); // 추천리스트 api
      setRecommendations(data);
      console.log('추천 리스트:', data);
    } catch (error) {
      console.error('추천 리스트 불러오기 오류:', error);
    }
  };

  // 공통 처리 함수 // x,♥,★ 버튼 이벤트 : 최종 모달 확인 버튼 클릭시 발생 이벤트
  // 추천리스트에서 해당 유저 제외시키는 이벤트
  const handleUserAction = async (apiFunc, targetUserId, errorMsg) => {
    try {
      await apiFunc(memberInfo.memId, targetUserId);
      setRecommendations((prev) => prev.filter((user) => user.memId !== targetUserId));
      return true;
    } catch (error) {
      console.error(errorMsg, error);
      return false;
    }
  };

  return {
    recommendations,
    setRecommendations,
    fetchRecommendations,
    handleUserAction,
  };
}
