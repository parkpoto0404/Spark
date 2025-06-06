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
    const { user } = location.state || {};
    const [detailData,setDetailData] = useState(null);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    console.log('user', user)
     

    useEffect(() => {
        const fetchDetailInfo = async () => {
            if (!user?.memId) return;

            try {
                const res = await fetch('http://localhost:8888/spark/api/DetailInfo', {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ memId: user.memId }),
                    
                });

                if (!res.ok) throw new Error("상세정보 요청 실패");

                const data = await res.json();
                setDetailData(data); 
                console.log("상세정보데이터: ",data);
            } catch (err) {
                console.error("err", err);
            }
        };

        fetchDetailInfo();
    }, [user]);

   
    if (!user || !detailData) return <div>로딩 중...</div>;

    // split을 안전하게 처리
    const interestSplit = (detailData.interest || "").split(",");
    const characterSplit = (detailData.character || "").split(",");
    const tendenciesSplit = (detailData.tendencies || "").split(",");



    




    return (
        <div className="container">
            <div className="profile-card">
                <img className="profile-image" src={`http://localhost:8888${user.proFile}`} alt="프로필" />
            </div>

            <div className="profile-header">
                <div style={{ display: 'flex' }}>
                    <h1>
                        <b>{detailData.nickName}&nbsp;&nbsp;{detailData.age}</b>
                    </h1>
                </div>
                <span style={{ marginTop: "25px", display: "flex" }}>
                    <PiBagSimpleFill style={{ alignSelf: "center", color: "black", zoom: "1.7" }} />
                    <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                        <b>{detailData.occupation}</b> {/*직업*/}
                    </p>
                </span>
                <span style={{ display: "flex" , marginTop: "20px"}}>
                    <IoLocationSharp style={{ alignSelf: "center", color: "#black", zoom: "1.7" }} />
                    <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                        <b>{detailData.location}</b> {/*주소*/}
                    </p>
                </span>
            </div>
            
            <div className='profile-data'>
              
                    <h2><b>기본정보</b></h2>
                    <div className='user-data-1'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <IoMdSchool style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px' ,fontSize: "20px" }}>
                                <b>{detailData.education}</b> {/*학력*/}
                            </p>
                        </span>
                        <span style={{ marginTop: "10px", display: "flex" , marginLeft : "120px"}}>
                            <RiRulerFill style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                <b>{detailData.tall}</b> {/*키*/}
                            </p>
                        </span>
                    </div>
                    <div className='user-data-2'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <MdOutlineSmokingRooms style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                <b>{detailData.smock}</b> {/*흡연*/}
                            </p>
                        </span>
                        <span style={{ marginTop: "10px", display: "flex" , left : "222px", position: "absolute"}}>
                            <FaSmileWink style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                <b>{detailData.mbti}</b> {/*mbti*/}
                            </p>
                        </span>
                    </div>
                    <div className='user-data-3'>
                        <span style={{ marginTop: "10px", display: "flex" }}>
                            <PiCrownCrossFill style={{ alignSelf: "center", zoom: "1.7" }}/>
                            <p style={{ marginLeft: '10px',fontSize: "20px"  }}>
                                <b>{detailData.religion}</b> {/*종교*/}
                            </p>
                        </span>
                    </div>

                    <h2 style={{marginTop: "50px"}}><b>관심사</b></h2>
                    <div className='profile-mind-list'>
                        {interestSplit.map((item,idx)=>(
                            <span className='list-items' id={`item-i-${idx}`}>
                                <p key={idx}><b>{item}</b></p>
                            </span>
                        ))}
                    </div>

                    <h2 style={{marginTop: "50px"}}><b>성격</b></h2>
                    <div className='profile-mind-list'>
                        {characterSplit.map((item,idx)=>(
                            <span className='list-items' id={`item-c-${idx}`}>
                                <p key={idx}><b>{item}</b></p>
                            </span>
                        ))}
                    </div>

                    <h2 style={{marginTop: "50px"}}><b>연예성향</b></h2>
                    <div className='profile-mind-list'>
                        {tendenciesSplit.map((item,idx)=>(
                            <span className='list-items' id={`item-t-${idx}`}>
                                <p key={idx}><b>{item}</b></p>
                            </span>
                        ))}
                    </div>

                    <h2 style={{marginTop: "50px"}}><b>소개</b></h2>
                    <div className='profile-myInfo'>
                        <div>
                            {detailData.memInfo}
                        </div>
                    </div>


                    
                
            </div>
            

        </div>
    );
};

export default Detail;
