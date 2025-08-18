import React, { useEffect, useState } from 'react';
import { requestChatList } from './api/chat_api';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { memId } = useAuthContext();
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!memId) return;
    const fetchChatList = async () => {
      try {
        const data = await requestChatList(memId);
        setChatList(data);
      } catch (err) {
        alert('채팅 리스트를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchChatList();
  }, [memId]);

  const handleChatClick = (chat) => {
    navigate(`/chat/room/${chat.clNo}`, { state: chat });
  };

  return (
    <div className="chat-list-container kakao-style">
      <h2 className="chat-title">채팅</h2>
      {loading ? (
        <div className="chat-loading">로딩중...</div>
      ) : chatList.length === 0 ? (
        <div className="chat-empty">채팅 내역이 없습니다.</div>
      ) : (
        <ul className="chat-list">
          {chatList.map((chat) => (
            <li key={chat.clNo} className="chat-item" onClick={() => handleChatClick(chat)}>
              <div className="chat-profile-thumb">
                <img src={chat.proFile ? `http://localhost:8888${chat.proFile}` : '/spark_logo.png'} alt="profile" />
              </div>
              <div className="chat-info">
                <div className="chat-user-row">
                  <span className="chat-user">{chat.nickName}</span>
                  <span className="chat-date">
                    {chat.lastMsgTime ? new Date(chat.lastMsgTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <div className="chat-last-message">{chat.clNewMsg}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
