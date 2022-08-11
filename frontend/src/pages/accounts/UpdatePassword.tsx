import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePw } from "../../lib/withTokenApi";
import { logoutApi } from "../../lib/withTokenApi";
import { logout } from "../../store/auth";

import ReturnMainModal from "../../components/ui/ReturnMainModal";

import styles from "./UpdatePassword.module.scss";

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordCheck, setPasswordCheck] = useState(true);
  const [passwordInputState, setPasswordInput] = useState("");
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    logoutApi()
      .then((res) => {
        dispatch(logout());
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitPwUpdateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredCurrentPassword = currentPasswordRef.current!.value;

    if (!passwordCheck) {
      alert("비밀번호를 확인해 주세요.");
    } else if (enteredCurrentPassword === passwordInputState) {
      alert("현재 비밀번호와 바꾸고자 하는 비밀번호가 동일합니다.");
    } else {
      const option = {
        currentPassword: enteredCurrentPassword,
        changedPassword: passwordInputState,
      };
      updatePw(option)
        .then((res) => {
          setModalOpen(true);
          console.log(res);
        })
        .catch((err) => {
          alert("에러가 발생했습니다.");
          navigate("/account/userUpdate");
        });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>비밀번호 변경</h1>
        <hr />
        <form className={styles.form}>
          <div className={styles.nowPw}>
            <label htmlFor="currentPw">현재 비밀번호 : </label>
            <input
              type="password"
              name="currentPw"
              id="currentPw"
              ref={currentPasswordRef}
              autoComplete="false"
            />
          </div>
          <br />
          <div>
            <label htmlFor="updatePw">변경할 비밀번호 : </label>
            <input
              type="password"
              name="updatePw"
              id="updatePw"
              autoComplete="false"
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label htmlFor="checkPw">비밀번호 확인 : </label>
            <input
              type="password"
              name="checkPw"
              id="checkPw"
              autoComplete="false"
              onChange={(event) => {
                if (passwordInputState === event.target.value) {
                  setPasswordCheck(true);
                } else {
                  setPasswordCheck(false);
                }
              }}
            />
          </div>
          {!passwordCheck && <p>비밀번호가 일치하지 않습니다.</p>}
          <br />
        <hr />
          <button
            onClick={submitPwUpdateHandler}
            disabled={!passwordCheck}
            className={styles.pwChangeBtn}
          >
            비밀번호 변경
          </button>
        </form>
        <React.Fragment>
          <ReturnMainModal
            open={modalOpen}
            close={closeModal}
            header="비밀번호 변경 완료"
          >
            <p>다시 로그인 해주세요.</p>
          </ReturnMainModal>
        </React.Fragment>
      </div>
    </div>
  );
};

export default UpdatePassword;
