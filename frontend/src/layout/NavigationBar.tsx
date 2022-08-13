import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../store/store";

import LogoutBtn from "../components/accounts/LogoutBtn";
import SearchForm from "../components/search/SearchForm";
import SearchModal from "../components/ui/SearchModal";

import style from "./NavigationBar.module.scss";
import logo from "../asset/moggo.png";
import AlertOnair from "../components/alert/AlertOnair";

const NavigationBar: React.FC = () => {
  const userState = useSelector((state: RootState) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  return (
    <header className={style.header}>
      <div className={style.div}>
        <ul>
          <li>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </li>
          <div className={style.div}>
          <li>
              <NavLink to="/notice/0">공지사항</NavLink>
            </li>
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
              <button
                onClick={() => {
                  setModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
                className = {style.searchButton}
              >
                검색
              </button>
            </li>
          </div>
        </ul>
      </div>
      <div className={style.div}>
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
                <AlertOnair />
              </li>
              <li className={style.logout}>
                <LogoutBtn />
              </li>
              <li>
                <div className={style.profile}>
                  <NavLink to={`/user/${userState.userInfo.id}`}>
                    {userState.userInfo.img ? (
                      <img
                        className={style.profileImg}
                        src={userState.userInfo.img}
                        alt=""
                      />
                    ) : (
                      <img
                        className={style.profileImg}
                        src={
                          "https://i.pinimg.com/236x/f2/a1/d6/f2a1d6d87b1231ce39710e6ba1c1e129.jpg"
                        }
                        alt=""
                      />
                    )}
                    <div>{userState.userInfo.nickname}</div>
                  </NavLink>
                </div>
              </li>
            </Fragment>
          )}
        </ul>
        <SearchModal open={modalOpen} close={closeModal}>
          <SearchForm close={closeModal} />
        </SearchModal>
      </div>
    </header>
  );
};
export default NavigationBar;
