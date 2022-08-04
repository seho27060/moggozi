import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReissue } from "../../lib/generalApi";

import ReturnMainModal from "../ui/ReturnMainModal";

const PasswordReissueForm: React.FC = () => {
  const navigate = useNavigate();

  const inputEmail = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);

  const [ modalOpen, setModalOpen ] = useState(false)
  const closeModal = () => {
    navigate('/', { replace: true });
  }

  const passwordFindHandler = (event: React.FormEvent) => {
    event.preventDefault()
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
          setModalOpen(true)
        })
        .catch((err) => {
          console.log(err)
          alert("에러가 발생했습니다. 다시 시도해주세요")
          // window.location.reload();
        });
    }
  };

  return (
    <div>
      <p>비밀번호를 잃어버리셨나요?</p>
      <p>하단의 정보를 상세히 입력해주세요.</p>
      <form>
        <div>
          <label htmlFor="email">email : </label>
          <input type="text" required id="email" ref={inputEmail} autoComplete="false"/>
        </div>
        <div>
          <label htmlFor="name">본명 : </label>
          <input type="text" required id="name" ref={inputName} />
        </div>
        <button onClick={passwordFindHandler}>비밀번호 재발급</button>
      </form>
      <React.Fragment>
        <ReturnMainModal
          open={modalOpen}
          close={closeModal}
          header="비밀번호 초기화 완료"
        >
          <p>비밀번호가 초기화 되었습니다.</p>
          <p>이메일을 확인해주세요!</p>
        </ReturnMainModal>
      </React.Fragment>
    </div>
  );
};

export default PasswordReissueForm;
