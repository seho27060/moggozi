import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutBtn from "../components/accounts/LogoutBtn";
import { RootState } from "../store/store";

const NavigationBar: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  return (
    <header>
      <div>로고</div>
      {userState.isLoggedIn && (
      <div>{ userState.nickname }님 안녕하세요!</div>
      )}
      <nav>
        <ul>
          <li>
            <NavLink to="/">Main</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          {!userState.isLoggedIn && (
            <Fragment>    
              <li>
                <NavLink to="/account/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/account/signup">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/account/passwordReissue">비밀번호 재발급</NavLink>
              </li>
            </Fragment>
          )}
          {userState.isLoggedIn && (
            <Fragment>
              <li>
                <LogoutBtn />
              </li>
              <li>
                <NavLink to={`/user/${userState.user_id}`}>{ userState.nickname }님의 MyPage</NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default NavigationBar;