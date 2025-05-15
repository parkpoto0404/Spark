import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";

const Home = () => {

  const { memberInfo,loading  } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);
  const navi = useNavigate();

  // 추천 리스트를 가져오는 함수
  const sparkUserList = async () => {

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
    if (!loading) { // 로딩이 끝나면
      console.log('memberInfo:', memberInfo); 
      if(!memberInfo || !memberInfo.nickName){ // 신유저가 입력도중 서버를 끄고 켜졌을때 메인으로 이동되었음.
                                               // 그런 상황일때 다시 insertInfo 페이지로 잘 연동될 수 있게 조건을 걸어줌. 
        navi('/insertInfo')
        return;
      }
      
      sparkUserList();
    }
  }, [loading, memberInfo,navi]);



  return (
    <div className="container">

    {recommendations.map((user,key) =>(
      <div className="profile-card" key={key}>
        <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필 이미지" />
        <div className="overlay">
          <h3>{user.nickName}&nbsp;&nbsp;{user.age}</h3>
          <span style={{marginTop: "10px", display: "flex"}}>
            <PiBagSimpleFill style={{alignSelf: "center"}}/>
            <p style={{marginLeft: '10px'}}>{user.occupation}</p>
          </span>
          <span style={{display: "flex"}}>
            <IoLocationSharp style={{alignSelf: "center"}}/>
            <p style={{marginLeft: '10px'}}>{user.location}</p>
          </span>
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
