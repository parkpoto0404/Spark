  import React, { useEffect, useState } from 'react';
  import { useAuthContext } from "../context/AuthContext";
  import { useNavigate,useLocation } from "react-router-dom";
  import { IoLocationSharp } from "react-icons/io5";
  import { PiBagSimpleFill } from "react-icons/pi";
  import { FiAlertCircle } from "react-icons/fi";
  import HomeModal from '../modal/HomeModal';

  const Home = () => {

    const { memberInfo, loading } = useAuthContext();
    const [recommendations, setRecommendations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);  // 삭제할 유저 ID 저장용 상태
    const navi = useNavigate();
    const location = useLocation();

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
      if (!loading) {
        if (loading || !memberInfo) return;
    
        if (!memberInfo.nickName) {
          navi('/insertInfo');
          return;
        }
    
        // 이전 페이지에서 전달받은 추천 리스트가 있다면 복원
        if (location.state?.recommendations) {
          setRecommendations(location.state.recommendations);
        } else {
          sparkUserList(); // 없으면 새로 요청  
        }
      }
    }, [loading, memberInfo, navi,location.state]);



    useEffect(() => {
      if (location.state?.scrollY) {
        setTimeout(() => {
          window.scrollTo(0, location.state.scrollY);
        }, 100); // 100ms 정도 딜레이
      }
    }, [location]);




    const handleRecommendDelete = async (userId) => { // userId 는 사용자가 클릭한 유저id

      const token = localStorage.getItem("jwt");

        try {
          const recommendDelete = await fetch('http://localhost:8888/spark/api/recommendDelete', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              hiddenId: memberInfo.memId,
              hiddenTarget: userId
            })
          });

          if (!recommendDelete.ok) {
            throw new Error('x버튼 서버에 요청 실패');
          }

          console.log("디스라이크 요청 보냄: ", memberInfo.memId, userId);
          console.log("보내는 body:", JSON.stringify({ hiddenId: memberInfo.memId, hiddenTarget: userId }));
          console.log("보내는 token:", token);

          setRecommendations((prev) => prev.filter((user) => user.memId !== userId));
          

        } catch (error) {
          console.error("싫어요 처리 중 오류:", error);

        }
      
    }



      // X 버튼 클릭 시 모달 띄우기
      const handleClickDeleteBtn = (userId) => {
        setDeleteUserId(userId);
        setShowModal(true);
      };
    
      // 모달 확인 버튼 눌렀을 때 실제 삭제 함수 호출
      const confirmDelete = () => {
        if (deleteUserId) {
          handleRecommendDelete(deleteUserId);
        }
        setShowModal(false);
        setDeleteUserId(null);
      };
    
      // 모달 취소 버튼 눌렀을 때
      const cancelDelete = () => {
        setShowModal(false);
        setDeleteUserId(null);
      };


      const goDetailPage = (user) => {
        navi('/detail',{
                  state : {
                          user,
                          recommendations,
                          scrollY: window.scrollY,
                        }
        }) // 객체형식으로 user 정보를 보낼 수 있음
      }








    return (
      <div className="container">

        {recommendations.map((user, key) => ( // 배포시 이미지 경로 바꿔줘야함?!

          <div className="profile-card" key={key}>
            <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필 이미지" />
            <div className="overlay">
              <div style={{display:'flex'}}>
                <h3>{user.nickName}&nbsp;&nbsp;{user.age}</h3>
                <span style={{width: '30px',
                              position: 'absolute',
                              left: '190px',
                              zoom: '1.8',
                              cursor:'pointer'}}
                              onClick={()=> goDetailPage(user)}>
                  <FiAlertCircle style={{ alignSelf: "center",color: "#ccc" }}/>
                </span>
              </div>
              <span style={{ marginTop: "10px", display: "flex" }}>
                <PiBagSimpleFill style={{ alignSelf: "center",color: "#ccc" }} />
                <p style={{ marginLeft: '10px' }}>{user.occupation}</p>
              </span>
              <span style={{ display: "flex" }}>
                <IoLocationSharp style={{ alignSelf: "center",color: "#ccc" }} />
                <p style={{ marginLeft: '10px' }}>{user.location}</p>
              </span>
            
            </div>
            <div className="buttons">
              <button className="btn-dislike" onClick={() => handleClickDeleteBtn(user.memId)}>✖</button>
              <button className="btn-like">❤</button>
              <button className="btn-chat">★</button>
            </div>
          </div>

        ))}

        {/* 삭제 확인용 모달 */}
        {showModal && (
          <HomeModal
            message="더이상 추천되지 않습니다. 제외하시겠습니까?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}






      </div>
    );
  };

  export default Home;
