import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoMdSchool } from "react-icons/io";
import { RiRulerFill } from "react-icons/ri";
import { MdOutlineSmokingRooms } from "react-icons/md";
import { FaSmileWink } from "react-icons/fa";
import { PiCrownCrossFill } from "react-icons/pi";


const Detail = () => {
    const location = useLocation();

    const { user } = location.state;
    
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    if (!user) return <div>사용자 정보가 없습니다.</div>;

    console.log('user', user)

    const interestData = user.interest;
    const interestSplit = interestData.split(",");

    

   
        
      

    return (
        <div className="container">
            <div className="profile-card">
                <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필" />
            </div>

            <div className="profile-header">
                <div style={{ display: 'flex' }}>
                    <h1>
                        <b>{user.nickName}&nbsp;&nbsp;{user.age}</b>
                    </h1>
                </div>
                <span style={{ marginTop: "25px", display: "flex" }}>
                    <PiBagSimpleFill style={{ alignSelf: "center", color: "black", zoom: "1.7" }} />
                    <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                        {user.occupation} {/*직업*/}
                    </p>
                </span>
                <span style={{ display: "flex" , marginTop: "20px"}}>
                    <IoLocationSharp style={{ alignSelf: "center", color: "#black", zoom: "1.7" }} />
                    <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                        {user.location} {/*주소*/}
                    </p>
                </span>
            </div>
            
            <div className='profile-data'>
              
                    <h2><b>기본정보</b></h2>
                    <div className='user-data-1'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <IoMdSchool style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                                {user.education} {/*학력*/}
                            </p>
                        </span>
                        <span style={{ marginTop: "10px", display: "flex" , marginLeft : "120px"}}>
                            <RiRulerFill style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                {user.tall} {/*키*/}
                            </p>
                        </span>
                    </div>
                    <div className='user-data-2'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <MdOutlineSmokingRooms style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                {user.smock} {/*키*/}
                            </p>
                        </span>
                        <span style={{ marginTop: "10px", display: "flex" , marginLeft : "168px"}}>
                            <FaSmileWink style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                {user.mbti} {/*mbti*/}
                            </p>
                        </span>
                    </div>
                    <div className='user-data-3'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <PiCrownCrossFill style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                {user.religion} {/*종교*/}
                            </p>
                        </span>
                    </div>

                    <h2 style={{marginTop: "70px"}}><b>취미</b></h2>
                    <div className='profile-interest'>
                        {interestSplit.map((item,idx)=>(
                            <span className='interest-items'>
                                <p key={idx}>{item}</p>
                            </span>
                        ))}
                    </div>


                    
                
            </div>
            

        </div>
    );
};

export default Detail;
