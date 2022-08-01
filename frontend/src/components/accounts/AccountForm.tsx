import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi, checkId, checkNickname } from "../../lib/generalApi";

import EmailModal from "../ui/EmailModal"
// 박세호, 회원가입 폼, 비밀번호 체크. axios 추가 필요. 요청성공시 메인페이지로 이동

const AccountForm: React.FC = () => {
  const navigate = useNavigate();

  const [ emailModalOpen, setEmailModalOpen] = useState(false)
  const [ nicknameModalOpen, setNicknameModalOpen] = useState(false)

  const emailOpenModal = (event: React.FormEvent) => {
    event.preventDefault()
    setEmailModalOpen(true)
  }

  const emailCloseModal = () => {
    setEmailModalOpen(false)
  }

  const nicknameOpenModal = () => {
    setNicknameModalOpen(true)
  }

  const nicknamecloseModal = () => {
    setNicknameModalOpen(false)
  }

  // 확인전 0, 중복일시 1, 사용가능 2
  // + 이메일과 닉네임 상태에 따라 해당 input 스타일 다르게 설정
  const [emailState, setEmailState] = useState(0);
  const [nickState, setNicknameState] = useState(0);


  const [passwordCheck, setPasswordCheck] = useState(true);
  const [passwordInputState, setPasswordInput] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  // 회원가입 
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

  // 이메일 중복 확인
  function emailCheckHandler(event: React.MouseEvent) {
    console.log(emailState)
    event.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    checkId(enteredEmail)
      .then((res) => {
        setEmailState(2);
      })
      .catch((err) => {
        setEmailState(1);
      });
  }

  // 닉네임 중복 확인
  function nicknameCheckHandler(event: React.MouseEvent) {
    console.log(nickState)
    event.preventDefault();
    const enteredNickname = nicknameInputRef.current!.value;
    checkNickname(enteredNickname)
      .then((res) => {
        setNicknameState(2);
      })
      .catch((err) => {
        setNicknameState(1);
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
            <button onClick={emailCheckHandler}>중복 확인</button>
            <button onClick={emailOpenModal}>이메일 모달 팝업</button>
            <React.Fragment>
              <EmailModal open={emailModalOpen} close={emailCloseModal} header="Modal heading">
                <p>팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요</p>
              </EmailModal>
            </React.Fragment>

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
            <button onClick={nicknameCheckHandler}>중복확인</button>
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
