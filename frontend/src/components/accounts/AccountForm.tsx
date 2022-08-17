import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi, checkId, checkNickname } from "../../lib/generalApi";

import Modal from "../ui/Modal";

import styles from "./AccountForm.module.scss";

const AccountForm: React.FC = () => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isNameChk, setIsNameChk] = useState(false);
  const [isNicknameChk, setIsNicknameChk] = useState(false);
  const [isEmailChk, setIsEmailChk] = useState(false);
  const [isPasswordChk, setIsPasswordChk] = useState(false);
  const [isPasswordSameChk, setIsPasswordSameChk] = useState(true);
  const [alertText, setAlertText] = useState(<div></div>);
  const [emailDoubleChk, setEmailDoubleChk] = useState(false);
  const [nicknameDoubleChk, setNicknameDoubleChk] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordCheckInputRef = useRef<HTMLInputElement>(null);
  const [emailContent, setEmailContent] = useState("");
  const [nicknameContent, setNicknameContent] = useState("");

  const navigate = useNavigate();

  const alertCloseModal = () => {
    setAlertModalOpen(false);
  };

  const emailCloseModal = () => {
    setEmailModalOpen(false);
  };

  const nicknameCloseModal = () => {
    setNicknameModalOpen(false);
  };

  // 회원가입
  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (!emailDoubleChk) {
      setAlertText(<div>이메일이 중복확인을 해주세요.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!isEmailChk) {
      setAlertText(<div>이메일이 옳지 않습니다.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!isNameChk) {
      setAlertText(<div>이름이 옳지 않습니다.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!isPasswordChk) {
      setAlertText(<div>비밀번호가 옳지 않습니다.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!isPasswordSameChk) {
      setAlertText(<div>비밀번호가 일치하지 않습니다.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!nicknameDoubleChk) {
      setAlertText(<div>닉네임 중복확인을 해주세요.</div>);
      setAlertModalOpen(true);
      return;
    }
    if (!isNicknameChk) {
      setAlertText(<div>닉네임이 옳지 않습니다.</div>);
      setAlertModalOpen(true);
      return;
    }
    const enteredEmail = emailInputRef.current!.value;
    const enteredUsername = usernameInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

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
        setAlertText(<div>회원가입이 완료되었습니다.</div>);
        setAlertModalOpen(true);
        navigate("/account/complete", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 유효성 검사
  const checkHandler = (event: React.ChangeEvent, select: string) => {
    event.preventDefault();
    switch (select) {
      case "email":
        if (
          /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(
            emailInputRef.current!.value
          )
        ) {
          setIsEmailChk(true);
        } else {
          setIsEmailChk(false);
        }
        break;
      case "nickname":
        if (
          /^[a-zA-Zㄱ-힣0-9-_.]{2,8}$/.test(nicknameInputRef.current!.value)
        ) {
          setIsNicknameChk(true);
        } else {
          setIsNicknameChk(false);
        }
        break;
      case "name":
        if (/^[가-힣]+$/.test(usernameInputRef.current!.value)) {
          setIsNameChk(true);
        } else {
          setIsNameChk(false);
        }
        break;
      case "password":
        if (
          /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/.test(
            passwordInputRef.current!.value
          )
        ) {
          setIsPasswordChk(true);
        } else {
          setIsPasswordChk(false);
        }
        // 비밀번호 확인
        if (
          passwordInputRef.current!.value ===
          passwordCheckInputRef.current!.value
        ) {
          setIsPasswordSameChk(true);
        } else {
          setIsPasswordSameChk(false);
        }
        break;
    }
  };

  // 이메일 중복 확인
  function emailCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setEmailModalOpen(true);
    const enteredEmail = emailInputRef.current!.value;
    checkId(enteredEmail)
      .then((res) => {
        // 중복이 아닐 경우
        setEmailContent("해당 이메일은 사용 가능합니다.");
        setEmailDoubleChk(true);
      })
      .catch((err) => {
        // 중복일 경우
        setEmailContent("해당 이메일은 사용할 수 없습니다.");
        setEmailDoubleChk(false);
      });
  }

  // 이메일 중복 확인 취소
  const emailCancelHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setEmailDoubleChk(false);
  };

  // 닉네임 중복 확인
  function nicknameCheckHandler(event: React.MouseEvent) {
    event.preventDefault();
    setNicknameModalOpen(true);
    const enteredNickname = nicknameInputRef.current!.value;
    checkNickname(enteredNickname)
      .then((res) => {
        setNicknameContent("해당 닉네임은 사용 가능합니다.");
        setNicknameDoubleChk(true);
      })
      .catch((err) => {
        setNicknameContent("해당 닉네임은 사용 할 수 없습니다.");
        setNicknameDoubleChk(false);
      });
  }

  // 닉네임 중복 확인 취소
  const nicknameCancelHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setNicknameDoubleChk(false);
  };

  return (
    <div className={styles.form}>
      <div className={styles.title}>회원가입</div>
      <div>
        <form>
          <div className={styles.email}>
            <div className={styles.label}>
              <label htmlFor="email">이메일</label>
            </div>
            {!isEmailChk && (
              <div className={styles.caution}>
                해당 이메일은 사용할 수 없습니다.
              </div>
            )}
            <div>
              <input
                type="text"
                required
                id="email"
                ref={emailInputRef}
                placeholder="이메일을 입력해주세요."
                autoComplete="off"
                disabled={emailDoubleChk ? true : false}
                onChange={(e) => checkHandler(e, "email")}
              />
            </div>
            <div>
              {emailDoubleChk ? (
                <button
                  className={styles.emailCompleteButton}
                  onClick={emailCancelHandler}
                >
                  확인 취소
                </button>
              ) : (
                <button
                  className={styles.emailButton}
                  onClick={emailCheckHandler}
                >
                  이메일 중복 확인
                </button>
              )}
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
            <div className={styles.label}>
              <label htmlFor="username">이름</label>
            </div>
            <div className={isNameChk ? styles.explain : styles.caution}>
              이름을 입력해주세요. 비밀번호 찾기에 이용됩니다. (2 ~ 5자)
            </div>
            <input
              type="text"
              required
              id="username"
              ref={usernameInputRef}
              placeholder="이름"
              onChange={(e) => checkHandler(e, "name")}
            />
          </div>

          <div className={styles.password}>
            <div className={styles.label}>
              <label htmlFor="password">비밀번호</label>
            </div>
            <div className={isPasswordChk ? styles.explain : styles.caution}>
              영문, 숫자를 포함한 8자리 이상의 비밀번호를 입력해주세요.
            </div>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
              placeholder="비밀번호"
              onChange={(e) => {
                checkHandler(e, "password");
              }}
            />
          </div>

          <div className={styles.repassword}>
            <div className={styles.label}>
              <label htmlFor="passwordCheck">비밀번호 확인</label>
            </div>
            {!isPasswordSameChk && (
              <p className={styles.caution}>비밀번호가 일치하지 않습니다.</p>
            )}
            <input
              type="password"
              required
              id="passwordCheck"
              ref={passwordCheckInputRef}
              placeholder="비밀번호 확인"
              onChange={(e) => {
                checkHandler(e, "password");
              }}
            />
          </div>

          <div className={styles.nickname}>
            <div className={styles.label}>
              <label htmlFor="nickname">닉네임</label>
            </div>
            <div className={isNicknameChk ? styles.explain : styles.caution}>
              2 ~ 8자의 닉네임을 입력하세요.
            </div>
            <div className={styles.nicknameCheck}>
              <input
                type="text"
                required
                id="nickname"
                ref={nicknameInputRef}
                placeholder="별명 (2 ~ 8자)"
                disabled={nicknameDoubleChk ? true : false}
                onChange={(e) => checkHandler(e, "nickname")}
              />
              {nicknameDoubleChk ? (
                <button
                  className={styles.nicknameCompleteButton}
                  onClick={nicknameCancelHandler}
                >
                  확인 취소
                </button>
              ) : (
                <button
                  className={styles.nicknameButton}
                  onClick={nicknameCheckHandler}
                >
                  중복 확인
                </button>
              )}
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
            className={styles.submit}
          >
            회원가입 하기
          </button>
        </form>
      </div>
      <Modal open={alertModalOpen} close={alertCloseModal} header="안내">
        {alertText}
      </Modal>
    </div>
  );
};

export default AccountForm;
