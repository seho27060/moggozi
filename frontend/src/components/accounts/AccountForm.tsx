import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi, checkId, checkNickname } from "../../lib/generalApi";

import Modal from "../ui/Modal"
// 박세호, 회원가입 폼, 비밀번호 체크. axios 추가 필요. 요청성공시 메인페이지로 이동

const AccountForm: React.FC = () => {
  const navigate = useNavigate();

  // 해당 상태에 따라 (emailState) 입력 input창을 빨갛게 표시
  const [ emailModalOpen, setEmailModalOpen] = useState(false)
  const [ emailState, setEmailState ] = useState(false)
  const [ nicknameModalOpen, setNicknameModalOpen] = useState(false)
  const [ nicknameState, setNicknameState ] = useState(false)

  console.log([emailState, nicknameState])
  

  const emailCloseModal = () => {
    setEmailModalOpen(false)
  }

  const nicknameCloseModal = () => {
    setNicknameModalOpen(false)
  }

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
      userImg: "",
      isPrivate: 0,
    };
    signUpApi(option)
      .then((res) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/account/complete");
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

  const [ emailContent, setEmailContent ] = useState("")
  // 이메일 중복 확인
  function emailCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setEmailModalOpen(true)
    const enteredEmail = emailInputRef.current!.value;
    checkId(enteredEmail)
      .then((res) => {
        // 중복이 아닐 경우
        setEmailContent("해당 이메일은 사용 가능합니다.")
        setEmailState(false);
      })
      .catch((err) => {
        // 중복일 경우
        setEmailContent("해당 이메일은 사용할 수 없습니다.")
        setEmailState(true);
      });
  }

  const [nicknameContent, setNicknameContent] = useState("")
  // 닉네임 중복 확인
  function nicknameCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setNicknameModalOpen(true)
    const enteredNickname = nicknameInputRef.current!.value;
    checkNickname(enteredNickname)
      .then((res) => {
        setNicknameContent("해당 닉네임은 사용 가능합니다.")
        setNicknameState(false);
      })
      .catch((err) => {
        setNicknameContent("해당 닉네임은 사용 할 수 없습니다.")
        setNicknameState(true);
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
            <React.Fragment>
              <Modal open={emailModalOpen} close={emailCloseModal} header="이메일 중복 확인">
                <p>{emailContent}</p>
              </Modal>
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
            <React.Fragment>
              <Modal open={nicknameModalOpen} close={nicknameCloseModal} header="닉네임 중복 확인">
                <p>{nicknameContent}</p>
              </Modal>
            </React.Fragment>
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
