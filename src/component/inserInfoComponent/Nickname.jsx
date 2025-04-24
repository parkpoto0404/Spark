import React from 'react'

// NickNamePage 컴포넌트
const NickName = ({ nickName, handleNickName }) => {
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
                <button type='button' className='nick-fine-btn'>중복확인</button>
            </div>
        </div>
    );
};

export default NickName
