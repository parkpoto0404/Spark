import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const { setLoginCheck, setMemberInfo } = useAuthContext();
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8888/spark/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ memId: id, memPwd: pwd }),
      });

      if (!res.ok) throw new Error("로그인 실패");

      const data = await res.json();
      const { accessToken } = data.token;
      const loginStatus = data.memberDto.status;

      console.log(loginStatus)
      console.log(data)


      localStorage.setItem("jwt", accessToken);
      setLoginCheck(true);
      alert("로그인 성공!");
      setMemberInfo(data.memberDto);

      if (loginStatus === 'A') { // 회원가입 후 처음 로그인시 정보입력페이지로!
        navi("/insertInfo");
      } else {
        navi("/");
      }


    } catch (err) {
      alert("아이디 혹은 비밀번호가 잘못되었습니다!");
    } finally {
      setId("");
      setPwd("");
    }
  };

  return (
    <div className="login_container">
      <h2>로그인</h2>

      <form id="loginForm" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="userId" className="label_only">
            휴대폰 번호
          </label>
          <input
            type="text"
            id="userId"
            name="memId"
            placeholder="휴대폰번호 (- 없이 입력해주세요 )"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="userPwd" className="label_only">
            비밀번호
          </label>
          <input
            type="password"
            id="userPwd"
            name="memPwd"
            placeholder="비밀번호"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </p>

        <button type="submit">로그인</button>
      </form>

      <div className="link-group">
        <Link to="/signup">회원가입</Link>
        <Link to="/pwdfind">비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default Login