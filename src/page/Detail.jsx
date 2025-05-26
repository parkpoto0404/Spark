import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";


const Detail = () => {
    const location = useLocation();

    const { user } = location.state;


    if (!user) return <div>사용자 정보가 없습니다.</div>;

    console.log('user', user)

    return (
        <div className="container">
            <div className="profile-card">
                <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필" />
            </div>

            <div className="profile-header">
                <div style={{ display: 'flex' }}>
                    <h2>{user.nickName}&nbsp;&nbsp;{user.age}</h2>
                </div>
                <span style={{ marginTop: "10px", display: "flex" }}>
                    <PiBagSimpleFill style={{ alignSelf: "center", color: "#ccc" }} />
                    <p style={{ marginLeft: '10px' }}>{user.occupation}</p>
                </span>
                <span style={{ display: "flex" }}>
                    <IoLocationSharp style={{ alignSelf: "center", color: "#ccc" }} />
                    <p style={{ marginLeft: '10px' }}>{user.location}</p>
                </span>
            </div>
            
            <div>
                <div>
                    <h2>기본정보</h2>
                </div>
            </div>
            

        </div>
    );
};

export default Detail;
