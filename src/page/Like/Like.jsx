import React from 'react'

const Like = () => {

  const requestLikeList = async () => {
      const token = localStorage.getItem("jwt");

      try {
        const likeRequestList = await fetch('http://localhost:8888/spark/api/',{

        })
      }catch {

      }
  }
  




  return (
    <div>
      <div className='like-contain'>
        <div className='like-header'>
          <h2>
            <b>좋아요 받음</b>
          </h2>
        </div>
      </div>
      <div className='like-list-box'>
        <div className='list-list-info'>
          <span className='like-list-img'>
            <span>
              <img src="" alt="" />
            </span>
          </span>
          <span className='like-list-name'>
            <span><b>닉네임</b></span>
            <span><b>나이</b></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Like
