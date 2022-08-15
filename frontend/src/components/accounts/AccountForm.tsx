import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi, checkId, checkNickname } from "../../lib/generalApi";

import Modal from "../ui/Modal";

import styles from "./AccountForm.module.scss";

const AccountForm: React.FC = () => {
  const navigate = useNavigate();

  // 해당 상태에 따라 (emailState) 입력 input창을 빨갛게 표시
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);

  console.log([emailState, nicknameState]);

  const emailCloseModal = () => {
    setEmailModalOpen(false);
  };

  const nicknameCloseModal = () => {
    setNicknameModalOpen(false);
  };

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

  const [emailContent, setEmailContent] = useState("");
  // 이메일 중복 확인
  function emailCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setEmailModalOpen(true);
    const enteredEmail = emailInputRef.current!.value;
    checkId(enteredEmail)
      .then((res) => {
        // 중복이 아닐 경우
        setEmailContent("해당 이메일은 사용 가능합니다.");
        setEmailState(false);
      })
      .catch((err) => {
        // 중복일 경우
        setEmailContent("해당 이메일은 사용할 수 없습니다.");
        setEmailState(true);
      });
  }

  const [nicknameContent, setNicknameContent] = useState("");
  // 닉네임 중복 확인
  function nicknameCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setNicknameModalOpen(true);
    const enteredNickname = nicknameInputRef.current!.value;
    checkNickname(enteredNickname)
      .then((res) => {
        setNicknameContent("해당 닉네임은 사용 가능합니다.");
        setNicknameState(false);
      })
      .catch((err) => {
        setNicknameContent("해당 닉네임은 사용 할 수 없습니다.");
        setNicknameState(true);
      });
  }

  return (
    <div className={styles.form}>
      <div className={styles.title}>회원가입</div>
      <div>
        <form>

            <div className={styles.email}>
              <div className={styles.label}>
                <label htmlFor="email">이메일</label>
              </div>
              <div>
                <input
                  type="text"
                  required
                  id="email"
                  ref={emailInputRef}
                  placeholder="이메일을 입력해주세요."
                  autoComplete="off"
                />
              </div>
              <div>
                <button
                  className={styles.emailbutton}
                  onClick={emailCheckHandler}
                >
                  이메일 중복 확인
                </button>
              </div>
              <React.Fragment>
                <Modal
                  open={emailModalOpen}
                  close={emailCloseModal}
                  header="이메일 중복 확인"
                >
                  <p>{emailContent}</p>
                </Modal>
              </React.Fragment>
            </div>

            <div className={styles.name}>
              <div className={styles.label}><label htmlFor="username">이름</label></div>
              <div className={styles.explain}>이름을 입력해주세요. 비밀번호 찾기에 이용됩니다.</div>
              <input
                type="text"
                required
                id="username"
                ref={usernameInputRef}
                placeholder="이름"
              />
            </div>
            
          <div className={styles.password}>
            <div className={styles.label}><label htmlFor="password">비밀번호</label></div>
            <div className={styles.explain}>영문, 숫자를 포함한 8자리 이상의 비밀번호를 입력해주세요.</div>
            <input
              type="password"
              required
              id="password"
              value={passwordInputState}
              placeholder="비밀번호"
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
            />
          </div>

          <div className={styles.repassword}>
            <div className={styles.label}><label htmlFor="passwordCheck">비밀번호 확인</label></div>
            <input
              type="password"
              required
              id="passwordCheck"
              placeholder="비밀번호 확인"
              onChange={(event) => {
                if (passwordInputState === event.target.value) {
                  setPasswordCheck(true);
                } else {
                  setPasswordCheck(false);
                }
              }}
            />
            {!passwordCheck && <p className={styles.caution}>비밀번호가 일치하지 않습니다.</p>}
          </div>

          <div className={styles.nickname}>
            <div className={styles.label}><label htmlFor="nickname">닉네임</label></div>
            <div className={styles.nicknameCheck}>
            <input type="text" required id="nickname" ref={nicknameInputRef} placeholder="별명 (2 ~ 15자)"/>
            <button className={styles.nicknameButton} onClick={nicknameCheckHandler}>중복확인</button>
            </div>
            <React.Fragment>
              <Modal
                open={nicknameModalOpen}
                close={nicknameCloseModal}
                header="닉네임 중복 확인"
              >
                <p>{nicknameContent}</p>
              </Modal>
            </React.Fragment>
          </div>
          <button
            type="button"
            onClick={submitHandler}
            disabled={!passwordCheck}
            className={styles.submit}
          >
            회원가입 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
