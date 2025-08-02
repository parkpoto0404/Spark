import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import HomeModal from '../../component/modal/HomeModal';
import AlertModal from '../../component/modal/AlertModal';
import { requestUserList, requestRecommendDelete, requestLike } from './api/home_api';
import { authFetch } from '../../utils/authFetch';

const Home = () => {

  const { memberInfo, loading } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(); // 모달 타입 (추천제외,좋아요,관심)
  const [deleteUserId, setDeleteUserId] = useState(null);  // 추천제외 할 유저 ID 저장용
  const [likeUserId, setLikeUserId] = useState(null);  // 좋아요 유저 ID 저장용
  const [requestUserId, setRequestUserId] = useState(); // 좋아요 응답 유저 아이디
  const [showAlertModal,setShowAlertModal] = useState(false); // 모달 확인메시지 알림용
  const navi = useNavigate();
  const location = useLocation();


  // 추천 리스트를 가져오는 함수
  const sparkUserList = async () => {
    try {
      const res = await authFetch('http://localhost:8888/spark/api/recommend', {
        method: 'POST',
        body: JSON.stringify(memberInfo),
      });
      const data = await res.json();
      setRecommendations(data);
      console.log('추천 리스트:', data);
    } catch (error) {
      console.error(error);
    }
  };



  // 추천 제외 핸들러
  const handleRecommendDelete = async (userId) => { // userId 는 사용자가 클릭한 유저의 id

    const token = localStorage.getItem("jwt");
    try {
      await requestRecommendDelete(memberInfo.memId, userId, token);
      setRecommendations((prev) => prev.filter((user) => user.memId !== userId));
    } catch (error) {
      console.error("추천 제외 처리 중 오류:", error);
    }

  }



  // 좋아요 신청 핸들러
  const handleRequestLike = async (userId) => {

    const token = localStorage.getItem("jwt");

    try {
      await requestLike(memberInfo.memId, userId, token);
      setRecommendations((prev) => prev.filter((user) => user.memId !== userId));

    } catch (error) {
      console.error("싫어요 처리 중 오류:", error);

    }

  }





  useEffect(() => { // 뒤로가기 스크롤 위치와 리스트 복원용

    const backFromDetail = sessionStorage.getItem('backFromDetail'); // 상세페이지에서 메인으로 넘어올때 상태를 구분

    if (loading || !memberInfo) return;

    if (!memberInfo.nickName) {
      navi('/insertInfo'); // 닉네임이 없다면 정보입력페이지로!
      return;
    }

    // 이전 페이지에서 전달받은 추천 리스트가 있다면 복원
    if (backFromDetail && location.state?.recommendations && location.state?.scrollY) {
      setRecommendations(location.state.recommendations);

      setTimeout(() => {
        window.scrollTo(0, location.state.scrollY);
        sessionStorage.removeItem('backFromDetail');
      }, 100); // 100ms 정도 딜레이

    } else {
      sparkUserList(); // 없으면 새로 요청 
      setTimeout(() => {
        window.scrollTo(0, 0); // 위에 세션을 삭제해줌으로써 새로고침시 스크롤 초기화
      }, 100); // 100ms 정도 딜레이

    }

  }, [loading, memberInfo, navi, location.state, location]);








  // X , 하트, 별 버튼 클릭 시 모달 띄우기
  const handleClickModalBtn = (userId, type) => {
    if (showModal) return; // 이미 모달 열려있으면 중복 실행 막기
    if (type === "x") {
      setDeleteUserId(userId);
    } else if (type === "heart") {
      setLikeUserId(userId);
    }
    setModalType(type);
    setShowModal(true);

  };



  // 추천제외 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
  const confirmDelete = () => {
    if (deleteUserId) {
      handleRecommendDelete(deleteUserId);
      setShowAlertModal(true);
    }
    setShowModal(false);
    setDeleteUserId(null);
  };

  // 좋아요 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
  const confirmLike = () => {
    if (likeUserId) {
      handleRequestLike(likeUserId);
      setShowAlertModal(true);
    }
    setShowModal(false);
    setLikeUserId(null);
  };



  // 모달 취소 버튼 눌렀을 때
  const modalCancelBtn = () => {
    if (modalType === "x") {
      setDeleteUserId(null);
    } else if (modalType === "heart") {
      setLikeUserId(null);
    }
    setShowModal(false);
  };


  useEffect(() => { // 모달 나올시 외부 스크롤 막기
    if (showModal||showAlertModal) {
      document.body.style.overflow = 'hidden';  // 스크롤 차단
    } else {
      document.body.style.overflow = 'auto';    // 스크롤 복원
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal,showAlertModal]);







  const goDetailPage = (user) => {
    navi('/detail', {
      state: {
        user,
        recommendations,
        scrollY: window.scrollY || 1,
      }
    }) // 객체형식으로 user 정보를 보낼 수 있음
  }










  return (
    <div className="container">

      {recommendations.map((user, key) => ( // 배포시 이미지 경로 바꿔줘야함?!

        <div className="profile-card" key={key}>
          <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필 이미지" />
          <div className="overlay">
            <div style={{ display: 'flex' }}>
              <h3>{user.nickName}&nbsp;&nbsp;{user.age}</h3>
              <span style={{
                width: '30px',
                position: 'absolute',
                left: '200px',
                zoom: '1.8',
                cursor: 'pointer'
              }}
                onClick={() => goDetailPage(user)}>
                <FiAlertCircle style={{ alignSelf: "center", color: "#ccc" }} />
              </span>
            </div>
            <span style={{ marginTop: "10px", display: "flex" }}>
              <PiBagSimpleFill style={{ alignSelf: "center", color: "#ccc" }} />
              <p style={{ marginLeft: '10px' }}>{user.occupation}</p>
            </span>
            <span style={{ display: "flex" }}>
              <IoLocationSharp style={{ alignSelf: "center", color: "#ccc" }} />
              <p style={{ marginLeft: '10px' }}>{user.location}</p>
            </span>

          </div>
          <div className="buttons">
            <button className="btn-dislike" onClick={() => {
              setRequestUserId(user.nickName);
              setTimeout(() => handleClickModalBtn(user.memId, "x"), 0);
            }}>✖</button>

            <button className="btn-like"
              onClick={() => {
                setRequestUserId(user.nickName);
                setTimeout(() => handleClickModalBtn(user.memId, "heart"), 0);
              }}>❤</button>
            <button className="btn-chat">★</button>
          </div>
        </div>

      ))}

      {/* 추천 제외 모달 */}
      {showModal && modalType === "x" && (
        <HomeModal
          message={`${requestUserId}님이 더 이상 추천되지 않습니다. 삭제 하시겠습니까?`}
          onConfirm={() => confirmDelete(requestUserId)}
          onCancel={modalCancelBtn}
        />
      )}
      {/*  추천 제회 확인 알림 모달 */}
      {showAlertModal && modalType === "x" &&(
        <AlertModal
          message={`${requestUserId}님을 성공적으로 삭제 했습니다.`}
          onCancel={() => setShowAlertModal(false)}
        />
      )}
      {/* 좋아요 모달 */}
      {showModal && modalType === "heart" && (
        <HomeModal
          message={`${requestUserId}님께 좋아요를 보내시겠습니까?`}
          onConfirm={()=> confirmLike(requestUserId)}
          onCancel={modalCancelBtn}
        />
      )}
      {/* 좋아요 확인 알림 모달 */}
      {showAlertModal && modalType === "heart" && (
        <AlertModal
          message={`${requestUserId}님께 좋아요를 성공적으로 보냈습니다.`}
          onCancel={() => setShowAlertModal(false)}
        />
      )}








    </div>
  );
};

export default Home;
