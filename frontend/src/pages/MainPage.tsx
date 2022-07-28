import type { RootState } from "../store/store";

import LogoutBtn from "../components/accounts/LogoutBtn";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

function MainPage() {
  const currentState = useSelector((state: RootState) => state);
  const isLoggedIn = currentState.user.isLoggedIn;
  console.log(currentState.user.isLoggedIn);
  console.log(currentState.user.isLoggedIn);
  // const myPageHandler = () => {
  //   navigate(`/user/${currentState.user.user_id}`, {state: currentState.user.user_id})
  // }

  return (
    <div>
      <h1>안녕하세요</h1>
      Mainpage
      {/* 로그인 상태일 경우에만 로그아웃 버튼 생성 */}
      {!isLoggedIn || <LogoutBtn />}
      <p></p>
      {!isLoggedIn || <Link to={`/user/${ currentState.user.userInfo.user_id }`} ></Link>}
    </div>
  );
}

export default MainPage;
