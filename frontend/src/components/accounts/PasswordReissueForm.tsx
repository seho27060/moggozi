import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReissue } from "../../lib/generalApi";

import ReturnMainModal from "../ui/ReturnMainModal";

import style from "./PasswordReissueForm.module.scss";

const PasswordReissueForm: React.FC = () => {
  const navigate = useNavigate();

  const inputEmail = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    navigate("/", { replace: true });
  };

  const passwordFindHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // 입력된 input값 변수에 담기
    const enteredEmail = inputEmail.current!.value;
    const enteredName = inputName.current!.value;
    // 둘다 비어있다면 에러 출력 / 이후에 수정해야함.
    if (enteredEmail.trim().length === 0 || enteredName.trim().length === 0) {
      alert("입력을 해주세요.");
      return;
    } else {
      const option = {
        username: enteredEmail,
        fullname: enteredName,
      };
      passwordReissue(option)
        .then((res) => {
          setModalOpen(true);
        })
        .catch((err) => {
          console.log(err);
          // window.location.reload();
        });
    }
  };

  return (
    <div className={style.main}>
      <div className={style.title}>
        <div className={style.a1}>비밀번호 재설정</div>
        <div className={style.a2}>비밀번호를 잊으셨나요?</div>
        <div className={style.a2}>하단의 정보를 상세히 입력해주세요.</div>
      </div>
      <form className={style.form}>
        <div>
          <div className={style.email}>
            <div>
              <label htmlFor="email">이메일</label>
            </div>
            <input
              type="text"
              required
              id="email"
              ref={inputEmail}
              autoComplete="off"
              placeholder="가입시 사용한 이메일을 입력해주세요."
            />
          </div>
        </div>
        <div>
          <div className={style.name}>
            <div>
              <label htmlFor="name">이름</label>
            </div>
            <input
              type="text"
              required
              id="name"
              ref={inputName}
              autoComplete="off"
              placeholder="이름"
            />
          </div>
        </div>
        <li>전송된 메일로 임시 비밀번호가 발급됩니다.</li>
        <li>발급된 임시 비밀번호를 이용하여 로그인하세요.</li>
        <button
          className={`${style.purpleButton}`}
          onClick={passwordFindHandler}
        >
          임시비밀번호 발급
        </button>
      </form>
      <React.Fragment>
        <ReturnMainModal open={modalOpen} close={closeModal} header="안내">
          <p>비밀번호가 초기화 되었습니다.</p>
          <p>이메일을 확인해주세요!</p>
        </ReturnMainModal>
      </React.Fragment>
    </div>
  );
};

export default PasswordReissueForm;
