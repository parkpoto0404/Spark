import React from 'react'

const MyInfo = ({handleMyInfo,info}) => {


    return (
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>나의 소개를 간단히 적어보세요.</h2>
            <div className='myinfo-container'>
                <textarea  className='myinfo-textarea' placeholder='간단한 자기소개를 써주세요.'
                 value={info}
                 onChange={handleMyInfo}/>
            </div>
        </div>
    )
}

export default MyInfo
