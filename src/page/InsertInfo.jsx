import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";





// NickNamePage 컴포넌트
const NickNamePage = ({ nickName, handleNickName }) => {
    return (
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>닉네임을 지어주세요!</h2>
            <div className='nickName-container'>
                <input
                    type="text"
                    className='nickName'
                    value={nickName}
                    onChange={handleNickName}
                />
                <button type='button' className='nick-fine-btn'>중복확인</button>
            </div>
        </div>
    );
};

const GenderPage = ({ handleGender, gender }) => {
    return (
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>성별</h2>
            <div className='gender-select'>
                <button
                    type='button'
                    className={`gender-f ${gender === 'F' ? 'selected' : ''}`}
                    onClick={() => handleGender('F')}
                >
                    여자
                </button>
                <button
                    type='button'
                    className={`gender-m ${gender === 'M' ? 'selected' : ''}`}
                    onClick={() => handleGender('M')}
                >
                    남자
                </button>
            </div>
        </div>
    );
};

// LastEducation 컴포넌트
const LastEducation = ({handleEducation,education}) => {

    const [isOpen, setIsopen] = useState(false); // 드롭다운용
    const [selected, setSelected] = useState('학력을 선택해주세요'); // 선택된 항목
    const options = ['대학교', '전문대', '고등학교', '중학교'];


    const toggleDropdown = () => {
        setIsopen(true);
    }

    const handleSelect = (option, e) => {
        e.stopPropagation(); // 버블링 방지
        setSelected(option);
        setIsopen(false);
        handleEducation(option); // 부모태그에 전달!!
        console.log(education)
        
    }

    // education prop과 로컬 상태 동기화
    useEffect(() => {
        if (education) {
        setSelected(education);
        }
    }, [education]);


    return (
        <div style={{ marginTop: '40px' }} className='slide-in'>
            <h2 className='userInfo-title'>최종학력을 선택해주세요.</h2>
            <div className='lastEducation'>
                <div name="" id="" className='lastEducation-select' onClick={toggleDropdown}>

                    <span>{selected}</span>


                </div>
                <ul className="lastEducation-options" >
                    {isOpen === true && options.map((option, index) => {
                        return (
                            <li key={index} onClick={(e) => handleSelect(option, e)}>
                                {option}
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    );
};



const Address = ({handleAddress,address}) => {

    const addressList = [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        "세종특별자치시",
        "경기도",
        "강원특별자치도",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주특별자치도"
      ];

    const [isOpen, setIsopen] = useState(false); // 드롭다운용
    const [selected, setSelected] = useState('거주 지역을 선택해주세요'); // 선택된 항목
    const toggleDropdown = () => {
        setIsopen(true);
    }

    const handleSelect = (option, e) => {
        e.stopPropagation(); // 버블링 방지
        setSelected(option);
        setIsopen(false);
        handleAddress(option); // 부모태그에 전달!!
        console.log(address)
        
    }

    // education prop과 로컬 상태 동기화
    useEffect(() => {
        if (address) {
        setSelected(address);
        }
    }, [address]);

    return(
        <div style={{ marginTop: '150px',
                     position: 'absolute',
                        width: '100%',
                        top: '265px'
         }} className='slide-in'>
            <h2 className='userInfo-title'>거주 지역을 선택해주세요.</h2>
            <div className='address'>
                <div name="" id="" className='address-select' onClick={toggleDropdown}>

                    <span>{selected}</span>


                </div>
                <ul className="address-options" >
                    {isOpen === true && addressList.map((option, index) => {
                        return (
                            <li key={index} onClick={(e) => handleSelect(option, e)}>
                                {option}
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}









// 메인 InsertInfo 컴포넌트
const InsertInfo = () => {

    const { step, setStep } = useAuthContext();
    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        job: '',
        info: '',
        gender: '',
        birthday: '',
        address: '',
        education: '',
        mbti: '',
        tall: '',
        religion: '',
        smock: '',
        interest: '',
        tendencies: '',
        character: '',
        profile: ''
    });
    

    const handleNext = () => { // 다음버튼
        setStep(prev => prev + 1);
    };

    const handleNickName = (e) => {
        setFormData({ ...formData, nickName: e.target.value });
    };

    const handleGender = (gender) => {
        setFormData({ ...formData, gender });
        console.log("선택된 성별:", formData.gender);
    };
    
    const handleEducation = (values) => {
        setFormData({...formData,education:values})
    }

    const handleAddress = (values) => {
        setFormData({...formData,address:values})
    }



    return (
        <div style={{ minHeight: '90vh' }}>
            <form>
                <div className='info-container'>
                    <div className='info-section'>
                        {step === 1 && (
                            <NickNamePage
                                nickName={formData.nickName}
                                handleNickName={handleNickName}
                            />
                        )}
                        {step === 2 && (
                            <GenderPage
                                handleGender={handleGender}
                                gender={formData.gender}
                            />
                        )}
                        {step === 3 && (
                            <>
                                <LastEducation handleEducation={handleEducation} education={formData.education}/>
                                <Address handleAddress={handleAddress} address={formData.address}/>
                            </>
                        )}
                    </div>

                    <button
                        type='button'
                        className='next-btn'
                        onClick={handleNext}
                    >
                        다음
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InsertInfo;
