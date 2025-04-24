import React, { useState } from 'react';



const MyProfile = ({ handleProfile,preview }) => {
  

  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      handleProfile(file); // 부모 컴포넌트로 파일 전달
    }
  }
  

  return (
    <div style={{ textAlign: 'center' }}>

     <h2>나의 프로필 사진을 등록해주세요.</h2>
      <label style={{ display: 'block', marginBottom: '10px' }}></label>
      <input type="file" accept="image/*" onChange={handleImageChange}  style={{marginTop: '25px',width:'90%'}}/>

      {preview && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={preview}
            alt="미리보기"
            style={{
              width: '355px',
              height: '435px',
              objectFit: 'cover',
              border: '2px solid #ccc'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
