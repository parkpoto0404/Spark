import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestChatMessages } from './api/chat_api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuthContext } from '../../context/AuthContext';
import '../../assets/scss/components/chatRoom.scss';

const ChatRoom = () => {
    const { memId } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { clNo, nickName, proFile } = location.state || {};
    // 더미 메시지
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const stompClientRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!clNo) return;
            try {
                const data = await requestChatMessages(clNo);
                console.log('채팅 메시지 데이터:', data);
                // 서버에서 받아온 메시지도 UI 구조로 변환
                const mapped = data.map(msg => ({
                    fromMe: msg.messageId === memId,
                    text: msg.messageContent || msg.text || '',
                    time: msg.time || new Date().toLocaleTimeString(),
                    ...msg
                }));
                setMessages(mapped);
                console.log('채팅 메시지 리스트 :', mapped);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, [clNo, memId]);

    // STOMP 연결 및 구독
    useEffect(() => {
        if (!clNo) return;
        const sock = new SockJS('http://localhost:8888/spark/chat');
        const client = new Client({
            webSocketFactory: () => sock,
            debug: (str) => console.log('STOMP DEBUG:', str),
            reconnectDelay: 5000,
        });
        client.onConnect = () => {
            console.log('✅ STOMP CONNECTED');
            client.subscribe(`/sub/chat/${clNo}`, (message) => {
                console.log('📩 수신:', message.body);
                const msg = JSON.parse(message.body);
                // 메시지 구조 통일: fromMe, text, time
                const normalizedMsg = {
                    fromMe: msg.messageId === memId, // 내 메시지 여부
                    text: msg.messageContent || msg.text || '',
                    time: msg.time || new Date().toLocaleTimeString(),
                    // 필요시 추가 필드
                    ...msg
                };
                setMessages((prev) => [...prev, normalizedMsg]);
            });
        };
        client.activate();
        stompClientRef.current = client;
        return () => {
            client.deactivate();
        };
    }, [clNo, memId]);

    // 스크롤 맨 아래로 내리기
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || !clNo) return;
        const payload = {
            nickName: nickName || '',
            messageContent: input,
            proFile: proFile || null,
            messageId: memId, // 필요시 실제 ID로 변경
        };
        console.log('[채팅 전송] pub:', `/pub/chat/${clNo}`, payload);
        stompClientRef.current.publish({
            destination: `/pub/chat/${clNo}`,
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json;charset=UTF-8' },
        });
        setInput('');
    };

    const handleProfileClick = () => {
        if (clNo) {
            navigate(`/detail/${clNo}`);
        }
    };

    return (
        <div className="chat-room-container">
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
                    {messages.length === 0 ? (
                        <div className="chat-room-empty">
                            아직 대화가 없습니다.<br />
                            상대방과 연결되었습니다. 첫 메시지를 보내보세요!
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message-item${msg.fromMe ? ' me' : ''}`}>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-bubble-time">{msg.time}</div>
                            </div>
                        ))
                    )}
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
