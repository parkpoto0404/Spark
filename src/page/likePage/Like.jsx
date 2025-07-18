import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestLikeList } from './api/like_api';



const Like = () => {


  const { memId, loading } = useAuthContext();
  const [likeList, setLikeList] = useState([]);

  console.log('memId : ', memId, '| type:', typeof memId);




  const sparkLikeList = useCallback(async () => {
    const token = localStorage.getItem("jwt");
    try {
      const data = await requestLikeList(memId, token);
      setLikeList(data);
      console.log("좋아요 리스트:", data);
    } catch (error) {
      console.error(error);
    }
  }, [memId]); // memId가 바뀌면 sparkLikeList도 바뀌도록
  // 만약 의존성배열에 안넣을시에는 memId가 바뀌어도 sparkLikeList는 초기 memId만 기억하고 있어서
  // 오래된 ID로 계속 API 요청하게 되는 심각한 버그가 생길 수 있다.


  useEffect(() => {
    if (!loading && memId) {
      sparkLikeList();
    }
  }, [loading, memId, sparkLikeList]);
  /*
    ESLint 경고 : useEffect 의존성 배열에 포함되지 않았기 때문에 
    React는 useEffect가 정확히 언제 다시 실행될지를 추적해야 한다.
    만약 sparkLikeList 함수가 변경되면 useEffect를 다시 실행해야 할 수도 있는데, 
    의존성 배열에 없으면 그걸 감지할 수 없다.
    따라서 이 오류가 거슬리기에 해결방법은 useCallback 을 사용하여
    의존성 배열에 추가한다.
  */


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
