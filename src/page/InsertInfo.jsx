import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";
import NickName from '../component/inserInfoComponent/Nickname';
import Education from '../component/inserInfoComponent/Education';
import Gender from '../component/inserInfoComponent/Gender';
import Address from '../component/inserInfoComponent/Address';
import Job from '../component/inserInfoComponent/Job';
import BirthDay from '../component/inserInfoComponent/BirthDay';
import Religion from '../component/inserInfoComponent/Religion';
import Tall from '../component/inserInfoComponent/Tall';
import MBTI from '../component/inserInfoComponent/Mbti';
import Smock from '../component/inserInfoComponent/Smock';
import Interest from '../component/inserInfoComponent/Interest';
import Tendencies from '../component/inserInfoComponent/Tendencies';
import Character from '../component/inserInfoComponent/Character';




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
        interest: [],
        tendencies: [],
        character: [],
        profile: ''
    });


    const handleNext = () => { // 다음버튼
        setStep(prev => prev + 1);
    };

    const handleNickName = (e) => { // 닉네임 핸들러
        setFormData({ ...formData, nickName: e.target.value });
    };

    const handleGender = (props) => { // 성별 핸들러
        setFormData({ ...formData, gender: props });

    };

    const handleEducation = (props) => { //학력 핸들러
        setFormData({ ...formData, education: props })
    }

    const handleAddress = (props) => { //거주지 핸들러
        setFormData({ ...formData, address: props })
    }

    const handleBirthday = (e) => { // 생년월일 핸들러
        const value = e.target.value.replace(/[^0-9]/g, '');

        // 1. 숫자 8자리(예: 19900101)가 되면 생년월일로 판단해서 계산을 시작
        if (value.length === 8) {
            // 2. 입력값에서 연도, 월, 일을 각각 잘라서 숫자로 바꿔
            const birthYear = parseInt(value.substring(0, 4), 10); // 앞 4글자 → 연도
            const birthMonth = parseInt(value.substring(4, 6), 10) - 1; // 중간 2글자 → 월 (JS는 0~11이라 -1)
            const birthDay = parseInt(value.substring(6, 8), 10); // 마지막 2글자 → 일

            // 3. Date 객체로 생년월일 날짜를 만들어
            const birthDate = new Date(birthYear, birthMonth, birthDay);

            // 4. 오늘 날짜를 구해 (Date()는 지금 이 순간의 날짜와 시간)
            const today = new Date();

            // 5. 현재 연도에서 생년 연도를 빼서 나이를 구함
            let age = today.getFullYear() - birthYear;

            // 6. 아직 생일이 안 지났으면 나이에서 -1 (예: 생일이 12월인데 지금 6월이면 아직 생일 안 지남)
            if (
                today.getMonth() < birthMonth ||
                (today.getMonth() === birthMonth && today.getDate() < birthDay)
            ) {
                age -= 1;
            }

            // 7. 나이가 19살 미만이면 알림
            if (age < 19) {
                alert('만 19세 이상만 가입할 수 있습니다.');
            }

            if (
                birthMonth < 0 || birthMonth > 11 ||  // 월은 0 ~ 11
                birthDay < 1 || birthDay > 31 ||     // 일은 1 ~ 31
                birthDate.getMonth() !== birthMonth || // 날짜가 자동 보정된 경우 방지
                birthDate.getDate() !== birthDay
            ) {
                alert("잘못된 입력방식입니다.");
                return;
            }
        }

        if (value.length <= 8) {
            setFormData({ ...formData, birthday: value })
        }


    }

    const handleJob = (props) => { //학력 핸들러
        setFormData({ ...formData, job: props })
    }

    const handleReligion = (props) => { //종교 핸들러
        setFormData({ ...formData, religion: props })
    }

    const handleTall = (props) => { //키 핸들러
        setFormData({ ...formData, tall: props })
    }
    const handleMBTI = (props) => { //mbti 핸들러
        setFormData({ ...formData, mbti: props })
    }
    const handleSmock = (props) => { //흡연 핸들러
        setFormData({ ...formData, smock: props })
    }


    const handleInterest = (item) => { // 취미 핸들러


        setFormData(prev => {

          const alreadySelected = prev.interest.includes(item);
          if (!alreadySelected && prev.interest.length >= 3) {
            return prev; // 아무것도 바꾸지 않고 그대로 반환
          }
      
          return {
            ...prev,interest: alreadySelected ? prev.interest.filter(i => i !== item) // 누르면 제거
                                                : [...prev.interest, item] // 아니면 추가
          };
        });


      };

      const handleTendencies = (item) => { // 연예성향 핸들러
        setFormData(prev => {
            
            const alreadySelected = prev.tendencies.includes(item);
            if (!alreadySelected && prev.tendencies.length >= 3) {
              return prev; // 아무것도 바꾸지 않고 그대로 반환
            }
        
            return {
              ...prev,tendencies: alreadySelected ? prev.tendencies.filter(i => i !== item) // 누르면 제거
                                                  : [...prev.tendencies, item] // 아니면 추가
            };
          });

      }

      const handleCharacter = (item) => {
        setFormData(prev => {
            
            const alreadySelected = prev.character .includes(item);
            if (!alreadySelected && prev.character.length >= 3) {
              return prev; // 아무것도 바꾸지 않고 그대로 반환
            }
        
            return {
              ...prev,character: alreadySelected ? prev.character.filter(i => i !== item) // 누르면 제거
                                                  : [...prev.character, item] // 아니면 추가
            };
          });

      }



    return (
        <div style={{ minHeight: '90vh' }}>
            <form>
                <div className='info-container'>
                    <div className='info-section'>
                        {step === 1 && (
                            <NickName
                                nickName={formData.nickName}
                                handleNickName={handleNickName}
                            />
                        )}
                        {step === 2 && (
                            <Gender
                                handleGender={handleGender}
                                gender={formData.gender}
                            />
                        )}
                        {step === 3 && (
                            <>
                                <Education handleEducation={handleEducation} education={formData.education} />
                                <Address handleAddress={handleAddress} address={formData.address} />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <BirthDay handleBirthday={handleBirthday} birthday={formData.birthday} />
                                <Job handleJob={handleJob} job={formData.job} />
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <Religion handleReligion={handleReligion} religion={formData.religion} />
                                <Tall handleTall={handleTall} tall={formData.tall} />
                            </>
                        )}
                        {step === 6 && (
                            <>
                                <MBTI handleMBTI={handleMBTI} mbti={formData.mbti} />
                                <Smock handleSmoke={handleSmock} smock={formData.smock} />
                            </>
                        )}
                        {step === 7 && (
                            <>
                                <Interest handleInterest={handleInterest} interest={formData.interest} />
                            </>
                        )}
                       
                        {step === 8 && (
                            <>
                                <Tendencies handleTendencies={handleTendencies} tendencies={formData.tendencies} />
                            </>
                        )}
                        {step === 9 && (
                            <>
                                <Character handleCharacter={handleCharacter} character={formData.character} />
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
