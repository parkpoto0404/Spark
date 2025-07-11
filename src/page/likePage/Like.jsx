import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";



const Like = () => {





  return (
    <div className="like-contain">
      <div className="like-header">
        <h2><b>좋아요 받음</b></h2>
      </div>

      <div className="like-list-box">
        <div className="list-list-info">
          <span className="like-list-img-contain">
            <span className="like-profile-img">
              <img src="/KakaoTalk_20241215_202202292.jpg" alt="프로필 이미지" />
            </span>
          </span>
          <span className="like-list-name">
            <span className="like-name"><b>박솨솨</b></span>
            <span className="like-age">25세</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Like;
