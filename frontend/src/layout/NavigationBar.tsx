import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutBtn from "../components/accounts/LogoutBtn";
import { RootState } from "../store/store";

import style from "./NavigationBar.module.scss";
import logo from "../asset/moggo.png";
import AlertOnair from "../components/alert/AlertOnair";

const NavigationBar: React.FC = () => {
  const userState = useSelector((state: RootState) => state.auth);

  return (
    <header className={style.header}>
      <div>
        <ul>
          <li>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </li>
          <div>
            <li>
              <NavLink to="/search">챌린지</NavLink>
            </li>
            <li>
              <NavLink to="/post/all">포스팅</NavLink>
            </li>
            <li>
              <NavLink to="/search">about</NavLink>
            </li>
            <li>
              <NavLink to="/search">검색</NavLink>
            </li>
          </div>
        </ul>
      </div>
      <div>
        <ul>
          {!userState.isLoggedIn && (
            <Fragment>
              <li>
                <NavLink to="/account/login">로그인</NavLink>
              </li>
              <li>
                <NavLink to="/account/signup">회원가입</NavLink>
              </li>
            </Fragment>
          )}
          {userState.isLoggedIn && (
            <Fragment>
              <li>
                <AlertOnair/>
              </li>
              <li className={style.logout}>
                <LogoutBtn />
              </li>
              <li>
                <div className={style.profile}>
                  <NavLink to={`/user/${userState.userInfo.id}`}>
                    <img
                      className={style.profileImg}
                      src={userState.userInfo.img}
                      alt="user_profile_image"
                    />
                    <div>{userState.userInfo.nickname}</div>
                  </NavLink>
                </div>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </header>
  );
};
export default NavigationBar;
