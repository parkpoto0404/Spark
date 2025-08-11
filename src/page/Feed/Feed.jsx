import React from "react";
import "../../assets/scss/components/feed.scss";

const dummyFeed = [
  { id: 1, image: "/spark_logo2.png", nickname: "닉네임1" },
  { id: 2, image: "/KakaoTalk_20241215_202202292.jpg", nickname: "닉네임2" },
  { id: 3, image: "/spark_logo.png", nickname: "닉네임3" },
  { id: 4, image: "/spark_logo2.png", nickname: "닉네임4" },
  { id: 5, image: "/spark_logo.png", nickname: "닉네임5" },
  { id: 6, image: "/KakaoTalk_20241215_202202292.jpg", nickname: "닉네임6" },
];

const Feed = () => (
  <div className="feed-gallery-container">
    <div className="feed-gallery-grid">
      {dummyFeed.map((item) => (
        <div className="feed-gallery-item" key={item.id}>
          <img src={item.image} alt="피드" />
          <div className="feed-gallery-nickname">{item.nickname}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Feed;
