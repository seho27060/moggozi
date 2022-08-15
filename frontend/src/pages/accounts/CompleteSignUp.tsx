import { useNavigate } from "react-router-dom";

import styles from "./CompleteSignUp.module.scss";
import RamG from "./../../asset/RamG.png";

const CompleteSignUp = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.complete}>
        <img src={RamG} alt="logo" />
        <div>환영합니다!</div>
        <div>모꼬지 회원가입이 완료되었습니다.</div>
        <div>챌린지를 통해 취미를 실천하고 공유해보세요!</div>
        <button onClick={() => {navigate("/account/login")}}>로그인 페이지로 이동</button>
    </div>
  );
};

export default CompleteSignUp;
