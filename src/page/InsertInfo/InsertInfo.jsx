import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import NickName from './inserInfoComponent/Nickname';
import Education from './inserInfoComponent/Education';
import Gender from './inserInfoComponent/Gender';
import Address from './inserInfoComponent/Address';
import Job from './inserInfoComponent/Job';
import BirthDay from './inserInfoComponent/BirthDay';
import Religion from './inserInfoComponent/Religion';
import Tall from './inserInfoComponent/Tall';
import MBTI from './inserInfoComponent/Mbti';
import Smock from './inserInfoComponent/Smock';
import Interest from './inserInfoComponent/Interest';
import Tendencies from './inserInfoComponent/Tendencies';
import Character from './inserInfoComponent/Character';
import MyProfile from './inserInfoComponent/MyProfile';
import MyInfo from './inserInfoComponent/MyInfo';
import { useInsertInfoHandlers } from './hooks/useInsertInfoHandlers';




// 메인 InsertInfo 컴포넌트
const InsertInfo = () => {

    const navi = useNavigate();
    const { step, setStep,setMemberInfo } = useAuthContext();
    const [preview, setPreview] = useState(null);
    const [nickNameCheck , setNickNameCheck] = useState(false); // 닉네임 확인용
    const [formData, setFormData] = useState({
        
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
        profile: []
    });

    const {
        handleNext,
        handleNickName,
        handleGender,
        handleEducation,
        handleAddress,
        handleBirthday,
        handleJob,
        handleReligion,
        handleTall,
        handleMBTI,
        handleSmock,
        handleInterest,
        handleTendencies,
        handleCharacter,
        handleMyInfo,
        handleProfile,

      } = useInsertInfoHandlers(step,setStep,formData, setFormData, setPreview,nickNameCheck);

      



      const hadleInfoSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('jwt');
        const data = new FormData();

        
        data.append('nickName',formData.nickName);
        data.append('location',formData.address);
        data.append('gender',formData.gender);
        data.append('birthDate',formData.birthday);
        data.append('occupation',formData.job);
        data.append('education',formData.education);
        data.append('mbti',formData.mbti);
        data.append('tall',formData.tall);
        data.append('religion',formData.religion); // 종교
        data.append('smock',formData.smock); // 흡연여부
        data.append('interest',formData.interest); // 관심사
        data.append('tendencies',formData.tendencies); // 연예성향
        data.append('character',formData.character); // 취미
        data.append('memInfo',formData.info)
        data.append('uploadFile',formData.profile[0]); // 사진

        if(formData.profile.length <= 0){
            return ;
        }
        

        try {
            const InfoListResponse = await fetch ('http://localhost:8888/spark/api/insertInfo' ,{
                method : 'PATCH',
                headers : { 
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
                body : data
            });

            const resdata = await InfoListResponse.json();
            console.log(resdata)
            if(InfoListResponse.ok){
                if(resdata  != null){
                    console.log('업로드 완료')
                    setMemberInfo(resdata); // 정보입력 후 화면은 step11 페이지에서 머무르고 있음 
                                            // 최신멤버로 업데이트를 하지않으면 제대로 이동이 안됨
                    alert('정보입력 완료')
                    navi('/');
                }else{
                    console.log('업로드 실패')
                }

            }else{
                console.log('업로드 실패')
            }
        } catch {
            console.log('업로드 에러')
        }


      }

    return (
        <div style={{ minHeight: '90vh' }}>
            <form onSubmit={hadleInfoSubmit} encType="multipart/form-data" >
                <div className='info-container'>
                    <div className='info-section'>
                        {step === 1 && (
                            <NickName
                                nickName={formData.nickName}
                                setNickNameCheck={setNickNameCheck}
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
                                <Smock handleSmock={handleSmock} smock={formData.smock} />
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
                        {step === 10 && (
                            <>
                                <MyInfo handleMyInfo={handleMyInfo} info={formData.info} />
                            </>
                        )}
                        {step === 11 && (
                            <>
                                <MyProfile handleProfile={handleProfile} preview={preview} />
                            </>
                        )}
                    </div>

                    {step !== 11 && (<button
                        type='button'
                        className='next-btn'
                        onClick={handleNext}
                        //disabled={!isStepValid()}
                    >
                        다음
                    </button>
                
                )}

                    {step === 11 && (<button
                        type='submit'
                        className='submit-btn'
                        onClick={handleNext}
                        //disabled={!isStepValid()}
                    >
                        완료
                    </button>)}
                </div>
            </form>
        </div>
    );
};

export default InsertInfo;
