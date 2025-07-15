import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestLikeList } from './api/like_api';



const Like = () => {


const { memId, loading } = useAuthContext();
const [likeList , setLikeList] = useState([]);

console.log('memId : ', memId, '| type:', typeof memId);

// 좋아요 리스트를 가져오는 함수
  const sparkLikeList = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const data = await requestLikeList(memId, token);
      setLikeList(data);
      console.log('좋아요 리스트:', data);
    } catch (error) {
      console.error(error);
    }
  };

   // 마운트 시 실행
  useEffect(() => {
    if (!loading && memId) {
      sparkLikeList();
    }
  }, [loading, memId]);


  return (
    <div className="like-contain">
      <div className="like-header">
        <h2><b>좋아요 받음</b></h2>
      </div>

    {likeList.map((likeUser, key) => (
        <div className="like-list-box" key={key}>
          <div className="list-list-info">
            <span className="like-list-img-contain">
              <span className="like-profile-img">
                <img
                  src={`http://localhost:8888${likeUser.proFile}`}
                  alt="프로필 이미지"
                  onError={(e) => {
                  e.target.onerror = null; // 무한 루프 방지
                  e.target.src = '/spark_logo.png'; // 이미지 없을때 대체 이미지
                }}
                />
              </span>
            </span>
            <span className="like-list-name">
              <span className="like-name"><b>{likeUser.nickName}</b></span>
              <span className="like-age">{likeUser.age}세</span>
            </span>
          </div>
        </div>
      ))}
      



    </div>
  );
};

export default Like;
