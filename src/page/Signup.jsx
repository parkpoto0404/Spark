import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {


  const [phone, setPhone] = useState(''); // 핸드폰 입력값
  const [smsNumber, setSmsNumber] = useState(''); // 인증번호 입력값
  const [smsResult, setSmsResult] = useState(''); // 발송된 인증번호
  const [smsStatus, setSmsStatus] = useState(false); // 인증번호 전송 상태
  const [authentication, setAuthentication] = useState(false); // 인증상태여부

  const [pwd, setPwd] = useState(''); // 비밀번호
  const [verifyPwd, setVerifyPwd] = useState(''); // 비밀번호 확인

  const [message, setMessage] = useState(''); // 비밀번호 확인 메세지
  const [messageColor, setMessageColor] = useState('red'); // 메세지 컬러

  const [terms1, setTerms1] = useState(false); // 필수 1
  const [terms2, setTerms2] = useState(false); // 필수 2
  const [terms3, setTerms3] = useState(false); // 선택
  const isAllChecked = terms1 && terms2 && terms3; // 올체크
  const navi = useNavigate();



  const sms = async () => {

    const phoneRegex = /^01[0-9]{8,9}$/; // 핸드폰 입력 정규식

    if (phone === '') {
      alert('휴대폰 번호를 입력해주세요')
      return;
    }

    if (phone !== '' && !phoneRegex.test(phone)) {
      alert("잘못된 번호 형식입니다.");
      return;
    }
    alert('인증번호가 발송되었습니다')
    setSmsStatus(true);

    /*
    try {
      const res = await fetch('http://localhost:8888/spark/api/sms', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: phone
      });

      if (!res.ok) throw new Error("인증 요청 실패");
      
      const data = await res.text();
      setSmsResult(data); // 서버에서 받은 인증번호라고 가정
      setSmsStatus(true);
      alert('인증번호가 전송되었습니다.')
    } catch (err) {
      console.log('인증실패', err);
    }
      */
  

  }



  const handleAuthentication = (e) => {
    e.preventDefault();

    if (!smsStatus) {
      alert('인증번호 전송 후 진행해주세요.')
      return;
    } else if (smsNumber === '') {
      alert('인증 번호를 입력해주세요.')
      return;
    } else {
      alert('인증 성공!')
      setAuthentication(true);
    }

  }



  const handleSingUp = async (e) => {
    e.preventDefault();

    if (phone === '' || smsNumber === '' || !smsStatus || !authentication) {
      alert('회원가입을 위해선 휴대폰 인증이 필요합니다.');
      return;
    } else if (pwd === '' || verifyPwd === '') {
      alert('비밀번호를 입력해주세요');
      return;
    } else if (pwd !== verifyPwd) {
      alert('비밀번호가 틀립니다.');
      return;
    } else if (!terms1 || !terms2) {
      alert('필수항목을 체크해주세요');
      return;
    } else {

      try {

        const res = await fetch ('http://localhost:8888/spark/api/signup',{
          method : 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            memId : phone,
            memPwd : pwd
          }),
        })

        if (!res.ok) throw new Error("회원가입 실패");

        const data = await res.json();
        console.log("회원가입 응답데이터 : ",data)
  
        alert('회원가입 성공하였습니다. 당신의 spark를 찾아보세요!')
        navi('/login')
      }catch(err){
        alert("회원가입 실패", err)
      }


    }

  }


  useEffect(() => { // 실시간으로 변경 된 비밀번호 상태 확인용
    if (verifyPwd.length === 0) {
      setMessage('');
    } else if (pwd === verifyPwd) {
      setMessage('비밀번호가 일치합니다!');
      setMessageColor('green');
    } else {
      setMessage('비밀번호가 일치하지 않아요!');
      setMessageColor('red');
    }
  }, [pwd, verifyPwd]); 


  const handleAllCheck = (e) => { // 모두동의 클릭시
    const checked = e.target.checked;
    setTerms1(checked);
    setTerms2(checked);
    setTerms3(checked);
  };

  const handleCheckChange = (e, setter) => { // 체크박스 각각 클릭스 이벤트핸들러
    const checked = e.target.checked;
    setter(checked);
  }



  return (
    <div style={{minHeight : '135vh'}}>
      <form onSubmit={handleSingUp}>

        <h3 className='ath-title'><b>휴대폰 번호</b></h3>
        <div className='ath-btn'>
          <input
            className='sign-phone'
            type="text"
            placeholder='(- 없이 입력해주세요)'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className='function-btn' type='button' onClick={sms}>인증번호 발송</button>
        </div>

        <h3 className='ath-title'><b>인증번호</b></h3>
        <div className='ath-btn'>
          <input
            type="text"
            className='sign-phone'
            placeholder='인증번호 입력'
            value={smsNumber}
            onChange={(e) => setSmsNumber(e.target.value)}
          />
          <button className='function-btn' type='button' onClick={handleAuthentication}>인증확인</button>
        </div>

        <h3 className='ath-title'><b>비밀번호</b></h3>
        <div className='ath-btn'>
          <input
            type="password"
            className='sign-pwd'
            placeholder='비밀번호 입력'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>

        <h3 className='ath-title'><b>비밀번호 확인</b></h3>
        <div className='ath-btn'>
          <input
            type="password"
            className='sign-pwd'
            placeholder='비밀번호 재입력'
            value={verifyPwd}
            onChange={(e) => setVerifyPwd(e.target.value)}
          />
        </div>
        {message && <p style={{ color: messageColor, marginLeft: '20px',marginTop: '15px' }}>{message}</p>}

        <div className="container-2">
          <div className="terms-box">
            <div>
              <input
                className='terms-all'
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllCheck}
              />
              <label className='terms-label'>
                모두 동의
              </label>
            </div>
            <p>전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.</p>
            <hr />

            <ul style={{ marginTop: '30px' }}>
              <li>
                <div>
                  <input
                    type="checkbox"
                    className="required"
                    checked={terms1}
                    onChange={e => handleCheckChange(e, setTerms1)}
                  />
                  <label className='required' id='terms-1'>
                    [필수] 이용약관 동의
                  </label>
                </div>
              </li>
              <li>
                <div>
                  <input
                    type="checkbox"
                    className="required"
                    checked={terms2}
                    onChange={e => handleCheckChange(e, setTerms2)}
                  />
                  <label className='required'>
                    [필수] 개인정보 수집 동의
                  </label>
                </div>
              </li>
              <li>
                <div>
                  <input
                    type="checkbox"
                    className="required"
                    checked={terms3}
                    onChange={e => handleCheckChange(e, setTerms3)}
                  />
                  <label className='required'>
                    [선택] 마케팅 수신 동의
                  </label>
                </div>
              </li>
            </ul>

          </div>
        </div>

        <div style={{padding: '0px 15px 0px 15px'}}>
          <button type='submit' className='sign-up-btn'>가입</button>
        </div>
      </form>
    </div>

  );
}

export default Signup;
