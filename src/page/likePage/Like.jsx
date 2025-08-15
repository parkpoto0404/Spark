import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestSendLikeList, requestInterestList, requestGetLikeList, requestLikeYes } from './api/like_api';
import { requestLike as homeRequestLike } from '../home/api/home_api';
import AlertModal from '../../component/modal/AlertModal'; 
import CommonModal from '../../component/modal/CommonModal';

const Like = () => {
  const { memId, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState('get'); // 탭 상태/받은 좋아요 기본값
  const [getLikeList, setGetLikeList] = useState([]); // 받은 좋아요
  const [interestList, setInterestList] = useState([]); // 관심목록
  const [sendLikeList, setSendLikeList] = useState([]); // 보낸 좋아요
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false); // 오류 메시지 상태 관리용
  const [successShowModal, setSuccessShowModal] = useState(false); // 성공 메시지 모달
  const [requestUser, setRequestUser] = useState(null);

  // 받은 좋아요 리스트 fetch
  useEffect(() => {
    if (loading || !memId) return;
    const fetchGet = async () => {
      try {
        const data = await requestGetLikeList(memId);
        setGetLikeList(data);
      } catch (e) {
        setGetLikeList([]);
      }
    };
    fetchGet();
  }, [loading, memId]);

  // 관심목록 fetch 
  useEffect(() => {
    if (loading || !memId) return;
    const fetchInterest = async () => {
      try {
        const data = await requestInterestList(memId);
        setInterestList(data);
      } catch (e) {
        setInterestList([]);
      }
    };
    fetchInterest();
  }, [loading, memId]);

  // 보낸 좋아요 fetch 
  useEffect(() => {
    if (loading || !memId) return;
    const fetchSend = async () => {
      try {
        const data = await requestSendLikeList(memId);
        setSendLikeList(data);
      } catch (e) {
        setSendLikeList([]);
      }
    };
    fetchSend();
  }, [loading, memId]);

  // 탭별 리스트 선택
  let currentList = [];
  if (activeTab === 'get') currentList = getLikeList;
  else if (activeTab === 'interest') currentList = interestList;
  else if (activeTab === 'send') currentList = sendLikeList;


  // 받은 좋아요 수락 함수
  const handleLikeYes = async (requestId, responseId) => {
    try {
      const res = await requestLikeYes(requestId, responseId);
      setGetLikeList(prev => prev.filter(user => user.memId !== requestId));
      setSuccessShowModal(true);
    } catch (e) {
      setSuccessShowModal(false);
      setErrorMessage(true); // 에러 발생 시 에러 모달 표시
    }
  }

   useEffect(() => { // 모달 나올시 외부 스크롤 막기
      if (showModal || successShowModal || errorMessage) {
        document.body.style.overflow = 'hidden';  // 스크롤 차단
      } else {
        document.body.style.overflow = 'auto';    // 스크롤 복원
      }
  
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [showModal, successShowModal, errorMessage]);


  return (
    <div className="like-contain">
      <div className="like-header">
        <div className="spark-like-tabs">
          <button className={`tab-btn${activeTab === 'get' ? ' active' : ''}`} onClick={() => setActiveTab('get')}>받은 좋아요</button>
          <button className={`tab-btn${activeTab === 'interest' ? ' active' : ''}`} onClick={() => setActiveTab('interest')}>관심목록</button>
          <button className={`tab-btn${activeTab === 'send' ? ' active' : ''}`} onClick={() => setActiveTab('send')}>보낸 좋아요</button>
        </div>
      </div>

      {currentList.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px', color: '#aaa' }}>리스트가 없습니다.</div>
      )}
      {currentList.map((likeUser, key) => (
        <div className="like-list-box" key={key}>
          <div className="list-list-info">
            <span className="like-list-img-contain">
              <span className="like-profile-img">
                <img
                  src={`http://localhost:8888${likeUser.proFile}`}
                  alt="프로필 이미지"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/spark_logo.png';
                  }}
                />
              </span>
            </span>
            <span className="like-list-name">
              <span className="like-name"><b>{likeUser.nickName}</b></span>
              <span className="like-age">{likeUser.age} 세</span>
            </span>
            {activeTab === 'get' && (
              <span className="like-list-buttons">
                <button
                  className="like-btn accept"
                  onClick={() => {
                    setRequestUser(likeUser);
                    setShowModal(true);
                  }}
                >
                  수락
                </button>
                <button
                  className="like-btn reject"
                  onClick={() => setShowModal(true)}
                >
                  관심없음
                </button>
              </span>
            )}
            {activeTab === 'interest' && (
              <span className="like-list-buttons">
                <button
                  className="like-btn accept"
                  onClick={() => {
                    setRequestUser(likeUser);
                    setShowModal(true);
                  }}
                >
                  좋아요
                </button>
                <button
                  className="like-btn reject"
                  onClick={() => setShowModal(true)}
                >
                  삭제
                </button>
              </span>
            )}
            {activeTab === 'send' && (
              <span className="like-list-buttons">
                <button
                  style={{ width: '100px', marginLeft: '60px' }}
                  className="like-btn reject"
                  onClick={() => setShowModal(true)}
                >
                  삭제
                </button>
              </span>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <CommonModal
          message={requestUser ? (
            activeTab === 'get'
              ? `${requestUser.nickName}님의 좋아요를 수락하시겠습니까?`
              : `${requestUser.nickName}님에게 좋아요를 보내시겠습니까?`
          ) : ''}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
            if (activeTab === 'interest') {
              try {
                await homeRequestLike(memId, requestUser.memId);
                setInterestList(prev => prev.filter(user => user.memId !== requestUser.memId));
                setSuccessShowModal(true);
              } catch (e) {
                setErrorMessage(true);
              }
              setShowModal(false);
            } else if (activeTab === 'get') {
              handleLikeYes(requestUser.memId, memId);
              setSuccessShowModal(true);
              setShowModal(false);
            }
          }}
        />
      )}
      {successShowModal && (
        <AlertModal
          message={requestUser ? (
            activeTab === 'get'
              ? `${requestUser.nickName}님의 좋아요를 수락하였습니다.`
              : `${requestUser.nickName}님에게 좋아요를 보냈습니다.`
          ) : '성공적으로 처리되었습니다.'}
          onCancel={() => setSuccessShowModal(false)}
        />
      )}
      {/* 오류 알림 모달 */}
      {errorMessage && (
        <AlertModal
          message={`오류 발생! 다시 시도해주세요`}
          onCancel={() => setErrorMessage(false)}
        />
      )}
    </div>
  );
};

export default Like;
