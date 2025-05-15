import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  


  const { user } = location.state;

  
  if (!user) return <div>사용자 정보가 없습니다.</div>;

  console.log('user',user)

  return (
    <div>
      <h2>{user.nickName}님의 프로필</h2>
      <img src={`http://localhost:8888${user.proFile}`} alt="프로필" />
      <p>자기소개: {user.memInfo}</p>
      <p>나이: {user.age}</p>
      <p>학력 : {user.education} </p>
      <p>직업: {user.occupation}</p>
      <p>지역: {user.location}</p>
     
    </div>
  );
};

export default Detail;
