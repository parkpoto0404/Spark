import React, { useState } from 'react';

// NickNamePage 컴포넌트
const NickName = ({ nickName, handleNickName }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);  // 중복 여부 상태
  const [message, setMessage] = useState('');  // 메시지 상태

  const DuplicateCheck = async () => {

    const accessToken = localStorage.getItem('jwt');
    try {
      const res = await fetch(`http://localhost:8888/spark/api/duplicateCheck?nickName=${nickName}`, {
        method: 'GET',
        headers:{Authorization: `Bearer ${accessToken}`},
        credentials: 'include'
      });
      console.log(res.ok);
      if (res.ok) {
        const nickNameChecking = await res.json();
        console.log(nickNameChecking)
        if (nickNameChecking === false) {
            setIsDuplicate(true);
            setMessage('이 닉네임은 이미 사용 중입니다.');
          } else {
            setIsDuplicate(false);
            setMessage('사용 가능한 닉네임입니다!');
          }
      } else {
        setIsDuplicate(true);
        setMessage('중복 확인 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      setIsDuplicate(true);
      setMessage('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ marginTop: '40px' }} className='slide-in'>
      <h2 className='userInfo-title'>닉네임을 지어주세요!</h2>
      <div className='inputs-container'>
        <input
          type="text"
          className='inputs'
          value={nickName}
          onChange={handleNickName}
        />
        <button type='button' className='nick-fine-btn' onClick={DuplicateCheck}>
          중복확인
        </button>
      </div>
      {message && (
        <p style={{ color: isDuplicate ? 'red' : 'green', marginTop: '10px' , marginLeft : '30px'}}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NickName;
