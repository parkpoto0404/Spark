import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestSendLikeList, requestInterestList, requestGetLikeList, requestLikeYes, requestLikeNo, requestInterestDelete, requestSendLikeDelete } from './api/like_api';
import { requestLike as homeRequestLike } from '../home/api/home_api';
import AlertModal from '../../component/modal/AlertModal'; 
import CommonModal from '../../component/modal/CommonModal';
import { useNavigate, useLocation } from 'react-router-dom';

const Like = () => {
  const { memId, loading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.state && location.state.fromTab) return location.state.fromTab;
    return 'get';
  }); // 탭 상태/받은 좋아요 기본값
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
            <span className="like-list-img-contain" onClick={() => navigate('/detail', { state: { user: likeUser, fromTab: activeTab } })} style={{ cursor: 'pointer' }}>
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
                  onClick={() => {
                    setRequestUser(likeUser);
                    setShowModal('reject');
                  }}
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
                  onClick={() => {
                    setRequestUser(likeUser);
                    setShowModal('interest-delete');
                  }}
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
                  onClick={() => {
                    setRequestUser(likeUser);
                    setShowModal('send-delete');
                  }}
                >
                  삭제
                </button>
              </span>
            )}
          </div>
        </div>
      ))}
      {showModal === true && (
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
                // 보낸 좋아요 리스트도 즉시 갱신
                const sendList = await requestSendLikeList(memId);
                setSendLikeList(sendList);
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
      {showModal === 'reject' && (
        <CommonModal
          message={requestUser ? `${requestUser.nickName}님의 좋아요를 거절하시겠습니까?` : ''}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
            try {
              await requestLikeNo(requestUser.memId, memId);
              setGetLikeList(prev => prev.filter(user => user.memId !== requestUser.memId));
            } catch (e) {
              setErrorMessage(true);
            }
            setShowModal(false);
          }}
        />
      )}
      {showModal === 'interest-delete' && (
        <CommonModal
          message={requestUser ? `${requestUser.nickName}님을 관심목록에서 삭제하시겠습니까?` : ''}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
            try {
              await requestInterestDelete(memId, requestUser.memId);
              setInterestList(prev => prev.filter(user => user.memId !== requestUser.memId));
            } catch (e) {
              setErrorMessage(true);
            }
            setShowModal(false);
          }}
        />
      )}
      {showModal === 'send-delete' && (
        <CommonModal
          message={requestUser ? `${requestUser.nickName}님에게 보낸 좋아요를 삭제하시겠습니까?` : ''}
          onCancel={() => setShowModal(false)}
          onConfirm={async () => {
            try {
              await requestSendLikeDelete(memId, requestUser.memId);
              setSendLikeList(prev => prev.filter(user => user.memId !== requestUser.memId));
            } catch (e) {
              setErrorMessage(true);
            }
            setShowModal(false);
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
