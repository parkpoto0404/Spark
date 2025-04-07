import React from 'react'


const Home = () => {
  return (

    <div className="container"> 
      <div className="profile-card">
        <img className="profile-image" src="/spark_logo.png" alt="프로필 이미지" />
        <div className="overlay">
          <h3>홍길동, 25</h3>
          <p>어플 처음이라 어색하지만<br/>좋은 인연 기다려볼게요♡</p>
        </div>
        <div className="buttons">
          <button className="btn-dislike">✖</button>
          <button className="btn-like">❤</button>
          <button className="btn-chat">📩</button>
        </div>
      </div>
      <div className="profile-card">
        <img className="profile-image" src="/spark_logo.png" alt="프로필 이미지" />
        <div className="overlay">
          <h3>홍길동, 25</h3>
          <p>어플 처음이라 어색하지만<br/>좋은 인연 기다려볼게요♡</p>
        </div>
        <div className="buttons">
          <button className="btn-dislike">✖</button>
          <button className="btn-like">❤</button>
          <button className="btn-chat">📩</button>
        </div>
      </div>
    </div>
  )
}

export default Home
