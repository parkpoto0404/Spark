import React, { useEffect, useState, useRef } from 'react';
import { requestChatList } from './api/chat_api';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const Chat = () => {
  const { memId } = useAuthContext();
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!memId) return;
    let stompClient;
    let subscriptions = [];
    const fetchChatList = async () => {
      try {
        const data = await requestChatList(memId);
        setChatList(data);

        // STOMP 연결
        console.log('SockJS 연결 시도');
        const sock = new SockJS('http://localhost:8888/spark/chat');
        stompClient = new Client({
          webSocketFactory: () => sock,
          debug: (str) => console.log('STOMP DEBUG:', str),
          reconnectDelay: 5000,
          onStompError: (frame) => {
            console.error('STOMP ERROR:', frame);
          },
          onWebSocketError: (event) => {
            console.error('WebSocket ERROR:', event);
          }
        });
        console.log('stompClient.activate() 호출');
        stompClient.activate();

        stompClient.onConnect = () => {
          console.log('STOMP 연결 성공');
          data.forEach((chat) => {
            const topic = `/sub/chat/${chat.clNo}`;
            console.log('구독 시도:', topic);
            const sub = stompClient.subscribe(
              topic,
              (message) => {
                console.log('메시지 수신:', topic, message.body);
                const msg = JSON.parse(message.body);
                setChatList((prev) =>
                  prev.map((c) =>
                    c.clNo === chat.clNo
                      ? { ...c, clNewMsg: msg.text, lastMsgTime: msg.time }
                      : c
                  )
                );
              }
            );
            subscriptions.push(sub);
          });
        };
        stompClientRef.current = stompClient;
      } catch (err) {
        alert('채팅 리스트를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchChatList();

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe && sub.unsubscribe());
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
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
            <li
              key={chat.clNo}
              className="chat-item"
              onClick={() => handleChatClick(chat)}
            >
              <div className="chat-profile-thumb">
                <img
                  src={
                    chat.proFile
                      ? `http://localhost:8888${chat.proFile}`
                      : '/spark_logo.png'
                  }
                  alt="profile"
                />
              </div>
              <div className="chat-info">
                <div className="chat-user-row">
                  <span className="chat-user">{chat.nickName}</span>
                  <span className="chat-date">
                    {chat.lastMsgTime
                      ? new Date(chat.lastMsgTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
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
