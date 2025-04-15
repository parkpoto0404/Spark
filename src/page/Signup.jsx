import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [smsNumber, setSmsNumber] = useState('');
  const [smsResult, setSmsResult] = useState('');
  const [showSmsInput, setShowSmsInput] = useState(false);
  const navi = useNavigate();

  const sms = async () => {
    try {
      const res = await fetch('http://localhost:8888/spark/api/sms', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      if (!res.ok) throw new Error("인증 요청 실패");

      const data = await res.json();
      setSmsResult(data); // 서버에서 받은 인증번호라고 가정
      setShowSmsInput(true);
    } catch (err) {
      console.log('인증실패', err);
    }
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if (smsNumber === smsResult) {
      // 인증 성공 → 가입 완료 처리
      alert("회원가입 완료!");
      navi('/login');
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  }

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder='핸드폰번호 입력'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="button" onClick={sms}>인증발송</button>

        {showSmsInput && (
          <input
            type="text"
            placeholder='인증번호 입력'
            value={smsNumber}
            onChange={(e) => setSmsNumber(e.target.value)}
          />
        )}

        <button type='submit'>가입</button>
      </form>
    </div>
  );
}

export default Signup;
