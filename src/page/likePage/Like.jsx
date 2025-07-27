import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestLikeList } from './api/like_api';



const Like = () => {


  const { memId, loading } = useAuthContext();
  const [likeList, setLikeList] = useState([]);

  console.log('[Like.jsx] 렌더링 - memId : ', memId, '| type:', typeof memId, '| loading:', loading);


  useEffect(() => {
    console.log('[Like.jsx] useEffect 진입 - memId:', memId, '| loading:', loading);
    if (loading) {
      console.log('[Like.jsx] 아직 로딩 중');
      return;
    }
    if (!memId) {
      console.log('[Like.jsx] memId 없음, 리스트 불러오지 않음');
      setLikeList([]);
      return;
    }
    const fetchLikeList = async () => {
      try {
        console.log('[Like.jsx] fetchLikeList 실행 - memId:', memId);
        const data = await requestLikeList(memId); // 최신 구조: token 파라미터 없이
        setLikeList(data);
        console.log('[Like.jsx] 좋아요 리스트:', data);
      } catch (error) {
        setLikeList([]);
        console.error('[Like.jsx] 좋아요 리스트 에러:', error);
      }
    };
    fetchLikeList();
  }, [loading, memId]);
  

  console.log('[Like.jsx] 렌더링 완료 - likeList:', likeList);


  return (
    <div className="like-contain">
      <div className="like-header">
        <div class="spark-like-tabs">
          <button class="tab-btn active">받은 좋아요</button>
          <button class="tab-btn">관심목록</button>
          <button class="tab-btn">보낸 좋아요</button>
        </div>
      </div>

      {likeList.map((likeUser, key) => (
        <div className="like-list-box" key={key}>
          <div className="list-list-info">
            <span className="like-list-img-contain">
              <span className="like-profile-img">
                <img
                  src={`http://localhost:8888${likeUser.proFile}`}
                  alt="프로필 이미지"
                  onError={(e) => { // 오류가 발생했을 때 실행되는 이벤트핸들러
                    e.target.onerror = null; // 무한 루프 방지 
                    // 대체 이미지마저 없을 경우 
                    // onError 실행됨 → 다시 대체 → 또 오류 → 무한 반복!
                    e.target.src = '/spark_logo.png'; // 이미지 없을때 대체 이미지
                  }}
                />
              </span>
            </span>
            <span className="like-list-name">
              <span className="like-name"><b>{likeUser.nickName}</b></span>
              <span className="like-age">{likeUser.age} 세</span>
            </span>
            <span className="like-list-buttons">
              <button
                className="like-btn accept"
                onClick={() => console.log(`수락: ${likeUser.nickName}`)}
              >
                좋아요
              </button>
              <button
                className="like-btn reject"
                onClick={() => console.log(`거절: ${likeUser.nickName}`)}
              >
                관심없음
              </button>
            </span>
          </div>
        </div>
      ))}




    </div>
  );
};

export default Like;
