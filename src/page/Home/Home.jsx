import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import HomeModal from '../../component/modal/HomeModal';
import AlertModal from '../../component/modal/AlertModal';
import { requestUserList, requestRecommendDelete, requestLike,requestUserInterest } from './api/home_api';
import { useHomeActions } from './hooks/useHomeActions';

const Home = () => {
  const { memberInfo, loading } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(); // 모달 타입 (추천제외,좋아요,관심)
  const [deleteUserId, setDeleteUserId] = useState(null);  // 추천제외 할 유저 ID 저장용
  const [likeUserId, setLikeUserId] = useState(null);  // 좋아요 유저 ID 저장용
  const [starUserId, setStarUserId] = useState(null); // 별 버튼 유저 ID 저장용
  const [requestUserId, setRequestUserId] = useState(); // 좋아요 응답 유저 아이디
  const [showAlertModal,setShowAlertModal] = useState(false); // 모달 확인메시지 알림용
  const [errorMessage,setErrorMessage] = useState(false); // 오류 메시지 상태 관리용
  const navi = useNavigate();
  const location = useLocation();

  // 커스텀 훅 사용
  const {
    recommendations,
    setRecommendations,
    fetchRecommendations,
    handleUserAction
  } = useHomeActions(memberInfo);



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
      fetchRecommendations(); // 없으면 새로 요청 
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
    } else if (type === "star") {
      setStarUserId(userId);
    }
    setModalType(type);
    setShowModal(true);

  };



  // 추천제외 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
  const confirmDelete = async () => {
    if (deleteUserId) {
      const result = await handleUserAction(requestRecommendDelete, deleteUserId, "추천 제외 처리 중 오류:");
      if (result) {
       setShowAlertModal(true); 
      }
    }
    setShowModal(false);
    setDeleteUserId(null);
  };

  // 좋아요 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
  const confirmLike = async () => {
    if (likeUserId) {
      const result = await handleUserAction(requestLike, likeUserId, "좋아요 처리 중 오류:");
      if (result) {
       setShowAlertModal(true); 
      }
    }
    setShowModal(false);
    setLikeUserId(null);
  };

  // 별 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
  const confirmStar = async () => {
    if (starUserId) {
      const result = await handleUserAction(requestUserInterest, starUserId, "별 처리 중 오류:");
      if (result) {
       setShowAlertModal(true); 
      }else{
        setErrorMessage(true);
      }
    }
    setShowModal(false);
    setStarUserId(null);
  };



  // 모달 취소 버튼 눌렀을 때
  const modalCancelBtn = () => {
    if (modalType === "x") {
      setDeleteUserId(null);
    } else if (modalType === "heart") {
      setLikeUserId(null);
    } else if (modalType === "star") {
      setStarUserId(null);
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







  const goDetailPage = (user) => { // 상세페이지로 이동
    navi('/detail', {
      state: { 
        user,
        recommendations, // 추천 리스트
        scrollY: window.scrollY || 1, // 현재 스크롤 위치 저장
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

            <button className="btn-chat" onClick={() => {
                setRequestUserId(user.nickName);
                setTimeout(() => handleClickModalBtn(user.memId, "star"), 0);
              }}>★</button>
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
      {/* 별 모달 */}
      {showModal && modalType === "star" && (
        <HomeModal
          message={`${requestUserId}님을 관심목록에 추가하시겠습니까?`}
          onConfirm={() => confirmStar(requestUserId)}
          onCancel={modalCancelBtn}
        />
      )}
      {/* 별 확인 알림 모달 */}
      {showAlertModal && modalType === "star" && (
        <AlertModal
          message={`${requestUserId}님을 관심목록에 추가했습니다.`}
          onCancel={() => setShowAlertModal(false)}
        />
      )}
      {/* 오류 알림 모달 */}
      {errorMessage && (
        <AlertModal
          message={`오류 발생! 다시 시도해주세요`}
          onCancel={() => setShowAlertModal(false)}
        />
      )}








    </div>
  );
};

export default Home;
