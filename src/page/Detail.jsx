import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoMdSchool } from "react-icons/io";


const Detail = () => {
    const location = useLocation();

    const { user } = location.state;
    

     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    if (!user) return <div>사용자 정보가 없습니다.</div>;

    console.log('user', user)

   
        
      

    return (
        <div className="container">
            <div className="profile-card">
                <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필" />
            </div>

            <div className="profile-header">
                <div style={{ display: 'flex' }}>
                    <h2><b>{user.nickName}&nbsp;&nbsp;{user.age}</b></h2>
                </div>
                <span style={{ marginTop: "10px", display: "flex" }}>
                    <PiBagSimpleFill style={{ alignSelf: "center", color: "black" }} />
                    <p style={{ marginLeft: '10px' }}>{user.occupation}</p>
                </span>
                <span style={{ display: "flex" }}>
                    <IoLocationSharp style={{ alignSelf: "center", color: "#black" }} />
                    <p style={{ marginLeft: '10px' }}>{user.location}</p>
                </span>
            </div>
            
            <div>
                <div>
                    <h2><b>기본정보</b></h2>
                    <span style={{ marginTop: "10px", display: "flex" }}>
                        <IoMdSchool style={{ alignSelf: "center" }}/>
                        <p style={{ marginLeft: '10px' }}>{user.education}</p>
                    </span>
                </div>
            </div>
            

        </div>
    );
};

export default Detail;
