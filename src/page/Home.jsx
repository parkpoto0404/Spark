import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../context/AuthContext";

const Home = () => {

  const { memberInfo,loading  } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);

  // 추천 리스트를 가져오는 함수
  const fetchRecommendations = async () => {

    console.log('추천 fetch 실행됨');

    const token = localStorage.getItem("jwt");

    try {

      const res = await fetch('http://localhost:8888/spark/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` // 토큰 보내기
        },
        body: JSON.stringify(memberInfo), // 로그인정보 요청데이터 보내기
      });

      if (!res.ok) {
        throw new Error('추천 리스트를 가져오는 데 실패했습니다.');
      }

      const data = await res.json();

      setRecommendations(data); // 추천 리스트 저장
      console.log('추천 리스트:', data); 

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (!loading && memberInfo) {
      fetchRecommendations();
    }

  }, [loading, memberInfo]);



  return (
    <div className="container">

    {recommendations.map((user,key) =>(

      <div className="profile-card" key={key}>
        <img className="profile-image" src="/spark_logo.png" alt="프로필 이미지" />
        <div className="overlay">
          <h3>{user.nickName}, {user.age}</h3>
          <p>{user.memInfo}</p>
        </div>
        <div className="buttons">
          <button className="btn-dislike">✖</button>
          <button className="btn-like">❤</button>
          <button className="btn-chat">☆</button>
        </div>
      </div>
    
    ))}


    
      
      

    </div>
  );
};

export default Home;
