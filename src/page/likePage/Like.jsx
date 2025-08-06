import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { requestSendLikeList, requestInterestList, requestGetLikeList } from './api/like_api';

const Like = () => {
  const { memId, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState('get'); // 탭 상태/받은 좋아요 기본값
  const [getLikeList, setGetLikeList] = useState([]); // 받은 좋아요
  const [interestList, setInterestList] = useState([]); // 관심목록
  const [sendLikeList, setSendLikeList] = useState([]); // 보낸 좋아요

  // 받은 좋아요 리스트 fetch
  useEffect(() => {
    if (loading || !memId) return;
    const fetchGet = async () => {
      try {
        const data = await requestGetLikeList(memId);
        console.log("[받은 좋아요 API 응답]", data);
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
        console.log("[관심목록 API 응답]", data);
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
        console.log("[보낸 좋아요 API 응답]", data);
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
                  onClick={() => console.log(`수락: ${likeUser.nickName}`)}
                >
                  좋아요
                </button>
                <button
                  className="like-btn reject"
                  onClick={() => console.log(`거절: ${likeUser.nickName}`)}
                >
                  관심없음
                </button>
              </span>
            )}
            {activeTab === 'send' && (
              <span className="like-list-buttons">
                <button
                  className="like-btn reject"
                  onClick={() => console.log(`삭제: ${likeUser.nickName}`)}
                >
                  삭제
                </button>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Like;
