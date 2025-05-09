import React, { useState } from "react";

export const useInsertInfoHandlers = (step, setStep, formData, setFormData, setPreview, nickNameCheck) => {

    
    const isStepValid = () => { // 정보입력 확인 핸들러
        console.log("Validating step", step);  // 현재 step을 확인


        switch (step) { // 해당 조건일때 step 숫자 반환!
            case 1: // 닉네임 입력 단계
                return formData.nickName.trim() !== '' && nickNameCheck 
            case 2: // 성별 선택 단계
                return formData.gender !== '';
            case 3: // 학력,주소 선택 단계
                return formData.education !== '' && formData.address !== '';
            case 4: // 생년월일,직업 선택 단계
                return formData.birthday.length === 8 && formData.job !== '';
            case 5: // 종교, 키 선택
                return formData.religion !== '' && formData.tall !== '';
            case 6: // MBTI,흡연여부 선택
                return formData.mbti !== '' && formData.smock !== '';
            case 7: // 관심사
                return formData.interest.length > 0;
            case 8: // 연예성향
                return formData.tendencies.length > 0;
            case 9: // 성격
                return formData.character.length > 0;
            case 10: // 자기소개
                return formData.info !== '';
            case 11: // 프로필 사진
                return formData.profile.length > 0;
            default:
                return false;
        }
    };
    


    const handleNext = () => {
        
        console.log('Current step:', step);
    
        const valid = isStepValid();
    
        if (!valid) {
            switch (step) {
                case 1:
                    if (formData.nickName.trim() === '') {
                        alert('닉네임을 입력해주세요');
                    } else if (!nickNameCheck) {
                        alert('중복확인을 해주세요');
                    }
                    break;
                case 2:
                    alert('성별을 선택해주세요');
                    break;
                case 3:
                    alert('학력과 주소를 모두 선택해주세요');
                    break;
                case 4:
                    alert('생년월일 8자리와 직업을 입력해주세요');
                    break;
                case 5:
                    alert('종교와 키를 모두 선택해주세요');
                    break;
                case 6:
                    alert('MBTI와 흡연 여부를 모두 선택해주세요');
                    break;
                case 7:
                    alert('관심사를 1개 이상 선택해주세요(3개까지 가능)');
                    break;
                case 8:
                    alert('연애 성향을 1개 이상 선택해주세요(3개까지 가능)');
                    break;
                case 9:
                    alert('매력을 1개 이상 선택해주세요(3개까지 가능)');
                    break;
                case 10:
                    alert('자기소개를 입력해주세요');
                    break;
                case 11:
                    alert('프로필 사진을 업로드해주세요');
                    break;
            }
            return;
        }
    
        if (step < 11) {
            setStep(prev => prev + 1);
        }
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
                ...prev, interest: alreadySelected ? prev.interest.filter(i => i !== item) // 누르면 제거
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
                ...prev, tendencies: alreadySelected ? prev.tendencies.filter(i => i !== item) // 누르면 제거
                    : [...prev.tendencies, item] // 아니면 추가
            };
        });

    }

    const handleCharacter = (item) => {
        setFormData(prev => {

            const alreadySelected = prev.character.includes(item);
            if (!alreadySelected && prev.character.length >= 3) {
                return prev; // 아무것도 바꾸지 않고 그대로 반환
            }

            return {
                ...prev, character: alreadySelected ? prev.character.filter(i => i !== item) // 누르면 제거
                    : [...prev.character, item] // 아니면 추가
            };
        });

    }

    const handleMyInfo = (e) => {
        setFormData({ ...formData, info: e.target.value })
    }


    const handleProfile = (file) => {
        if (file) {
            const previewURL = URL.createObjectURL(file); // 파일 미리보기 URL 생성
            setPreview(previewURL); // 미리보기 상태 업데이트

            setFormData((prev) => ({
                ...prev,
                profile: [file], // 단일 파일로 배열로 저장
            }));
        }
    };


    return {

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
        isStepValid,

    };

}