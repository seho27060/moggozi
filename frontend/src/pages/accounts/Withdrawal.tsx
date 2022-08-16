import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";

import { withdrawal } from "../../lib/withTokenApi";
import Modal from "../../components/ui/Modal";

import styles from "./Withdrawal.module.scss";

const Withdrawal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputPassword = useRef<HTMLInputElement>(null);

  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [incorrectModalOpen, setIncorrectModalOpen] = useState(false);

  const withdrawalCloseModal = () => {
    navigate("/")
    window.location.reload()
  };
  const incorrectCloseModal = () => {
    setIncorrectModalOpen(false);
  };

  const withdrawalSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredPassword = inputPassword.current!.value;
    console.log(enteredPassword);
    const option = {
      password: enteredPassword,
    };
    withdrawal(option)
      .then((res) => {
        dispatch(logout())
        setWithdrawalModalOpen(true);
      })
      .catch((err) => {
        setIncorrectModalOpen(true);
      });
  };


  useEffect(() => {
    document.body.style.overflow = 'unset';
  }, [])

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1>회원 탈퇴</h1>
          <p>회원 탈퇴 전에 반드시 유의사항을 확인하고 진행해 주세요.</p>
          <div className={styles.horizon}></div>
          <h4>개인정보 및 서비스 이용 기록 삭제</h4>
          <p>
            개인정보 및 개인화 서비스 이용기록이 모두 삭제 되며, 삭제된 데이터는
            복구되지 않습니다. 필요한 데이터는 미리 백업해 주시기 바랍니다.
          </p>
          <br />
          <h4>소셜 계정 연결 정보 삭제</h4>
          <p>
            이메일 ID에 소셜 계정을 연결한 경우 탈퇴 시 연결 정보도 함께
            삭제됩니다.
          </p>
          <br />
          <h4>커뮤니티 서비스 등록 게시물 유지</h4>
          <p>
            회원가입 이후 등록하신 게시물들은 회원탈퇴 후에도 삭제 되지 않고
            유지됩니다. 삭제를 원하시는 경우에는 직접 삭제하신 후 회원탈퇴를
            진행하시기 바랍니다.
          </p>
          <br />
          <h4>개인정보 보관</h4>
          <p>
            회원 탈퇴 시 일부 개인정보는 개인정보처리방침에 따라 탈퇴일로부터
            30일간 보관되며, 그 이후 관계법령에 필요한 경우에는 별도 보관합니다.
          </p>
          <br />
          <h4>탈퇴 후 제한</h4>
          <p>탈퇴 처리된 이메일 ID는 30일동안 재가입이 불가능합니다.</p>
          <br />
          <hr />
          {/* <div className={styles.horizon_2}></div> */}
          <div className={styles.formBox}>
            <form>
              <div className={styles.inputbox}>
                <div>비밀번호</div>
                <input
                  type="password"
                  ref={inputPassword}
                  placeholder="비밀번호 입력"
                />
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.button1}
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    navigate("/");
                  }}
                >
                  취소
                </button>
                <button
                  className={styles.button2}
                  onClick={withdrawalSubmitHandler}
                >
                  회원 탈퇴
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={withdrawalModalOpen}
        close={withdrawalCloseModal}
        header="회원 탈퇴 완료"
      >
        <h4>회원탈퇴가 완료되었습니다.</h4>
        <br />
        <p>moggozi를 이용해주시고 사랑해주셔서 감사합니다.</p>
        <br />
        <p>더욱더 노력하고 발전하는 moggozi가 되겠습니다.</p>
        <br />
      </Modal>
      <Modal
        open={incorrectModalOpen}
        close={incorrectCloseModal}
        header="비밀번호 오류"
      >
        <p>비밀번호가 틀렸습니다.</p>
        <br />
        <p>다시 한번 입력해주세요.</p>
      </Modal>
    </div>
  );
};

export default Withdrawal;
