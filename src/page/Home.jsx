import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { memberInfo } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);

  // 추천 리스트를 가져오는 함수
  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:8888/spark/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("jwt")  
        },
        body: JSON.stringify(memberInfo), // memberInfo를 요청 본문에 포함
      });

      if (!response.ok) {
        throw new Error('추천 리스트를 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      setRecommendations(data); // 추천 리스트를 상태에 저장
      console.log('추천 리스트:', data); // 콘솔에 추천 리스트 출력
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (memberInfo) {
      fetchRecommendations(); // memberInfo가 있을 때 추천 리스트를 가져옴
    }
  }, [memberInfo]);

  

  return (
    <div className="container">
      <div className="profile-card">
        <img className="profile-image" src="/spark_logo.png" alt="프로필 이미지" />
        <div className="overlay">
          <h3>홍길동, 25</h3>
          <p>어플 처음이라 어색하지만<br />좋은 인연 기다려볼게요♡</p>
        </div>
        <div className="buttons">
          <button className="btn-dislike">✖</button>
          <button className="btn-like">❤</button>
          <button className="btn-chat">📩</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
