import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/scss/components/chatRoom.scss';

const ChatRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clNo, nickName, proFile } = location.state || {};
  // 더미 메시지
  const [messages, setMessages] = useState([
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    { fromMe: false, text: '안녕하세요!', time: '13:10' },
    { fromMe: true, text: '안녕하세요! 반가워요 😊', time: '13:11' },
    


    
  ]);
  const [input, setInput] = useState('');

  // 스크롤 맨 아래로 내리기
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

 

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    setMessages([
      ...messages,
      { fromMe: true, text: input, time: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInput('');
  };

  const handleProfileClick = () => {
    if (clNo) {
      navigate(`/detail/${clNo}`);
    }
  };

  return (
    <div className="chat-room-container">
      {/* Header 컴포넌트가 이미 상단에 렌더링되므로, 여기서는 프로필/닉네임만 */}
      <div className="chat-room-header-info">
        <div className="chat-room-profile-thumb">
          <img
            src={proFile ? `http://localhost:8888${proFile}` : '/spark_logo.png'}
            alt="profile"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <span className="chat-room-nickname">{nickName}</span>
      </div>
      <div className="chat-room-body">
        <div className="chat-message-list">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message-item${msg.fromMe ? ' me' : ''}`}>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-bubble-time">{msg.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form className="chat-room-input-wrap" onSubmit={handleSend}>
        <input
          className="chat-room-input"
          type="text"
          name="chatMessage"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="chat-room-send-btn" type="submit">전송</button>
      </form>
    </div>
  );
};

export default ChatRoom;
