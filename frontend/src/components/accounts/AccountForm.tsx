import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// 박세호, 회원가입 폼, 비밀번호 체크. axios 추가 필요. 요청성공시 메인페이지로 이동

const AccountForm: React.FC = () => {
  const navigate = useNavigate()

  const [passwordCheck, setPasswordCheck] = useState(true)
  const [passwordInputState, setPasswordInput] = useState("")

  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredUsername = usernameInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;
    const enteredPassword = passwordInputState

    const accountData = {
      email: enteredEmail,
      username: enteredUsername,
      nickname: enteredNickname,
      password: enteredPassword,
      introduce: "",
      is_private: "",
      user_img: "",
    };
    // axios를 통한 https 요청 보내기
    // 가입정보 보내고 해당 정보로 로그인 vs 메인페이지 이동
    console.log(accountData);
    navigate("/",{replace : true})
  }
  
  return (
    <div>
      <h3>Account form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">email : </label>
            <input
              type="text"
              required
              id="email"
              ref={emailInputRef}
            />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="password"
              required
              id="password"
              value = {passwordInputState}
              onChange = {(event) => {
                setPasswordInput(event.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="passwordCheck">type password again: </label>
            <input
              type="password"
              required
              id="passwordCheck"
              onChange={(event) => {
                if (passwordInputState === event.target.value){
                  setPasswordCheck(true)
                } else {
                  setPasswordCheck(false)
                }
              }}
            />
            { !passwordCheck && <p>password is not match, check again plz</p>}
          </div>
          <div>
            <label htmlFor="username">username : </label>
            <input type="text" required id="username" ref={usernameInputRef} />
          </div>
          <div>
            <label htmlFor="nickname">nickname : </label>
            <input type="text" required id="nickname" ref={nicknameInputRef} />
          </div>
          <button type="button" onClick={submitHandler} disabled = {!passwordCheck} >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
