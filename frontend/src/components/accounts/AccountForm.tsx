import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../lib/generalApi";

// 박세호, 회원가입 폼, 비밀번호 체크. axios 추가 필요. 요청성공시 메인페이지로 이동

const AccountForm: React.FC = () => {
  const navigate = useNavigate();

  const [passwordCheck, setPasswordCheck] = useState(true);
  const [passwordInputState, setPasswordInput] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredUsername = usernameInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;
    const enteredPassword = passwordInputState;

    const option = {
      username: enteredEmail,
      fullname: enteredUsername,
      nickname: enteredNickname,
      password: enteredPassword,
      introduce: "",
      is_private: 0,
      user_img: "",
    };
    signUpApi(option)
      .then((res) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.message === "Error: Nickname is already taken.") {
          alert("닉네임이 중복되었습니다.");
        } else if (
          err.response.data.message ===
          "Error: Username(email) is already taken."
        ) {
          alert("이메일이 중복되었습니다.");
        }
        console.log(err.response);
      });
  }

  return (
    <div>
      <h3>Account form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">email : </label>
            <input type="text" required id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="password"
              required
              id="password"
              value={passwordInputState}
              onChange={(event) => {
                setPasswordInput(event.target.value);
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
                if (passwordInputState === event.target.value) {
                  setPasswordCheck(true);
                } else {
                  setPasswordCheck(false);
                }
              }}
            />
            {!passwordCheck && <p>password is not match, check again plz</p>}
          </div>
          <div>
            <label htmlFor="username">본명 : </label>
            <input type="text" required id="username" ref={usernameInputRef} />
          </div>
          <div>
            <label htmlFor="nickname">닉네임 : </label>
            <input type="text" required id="nickname" ref={nicknameInputRef} />
          </div>
          <button
            type="button"
            onClick={submitHandler}
            disabled={!passwordCheck}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
