import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../lib/generalApi";
import Cookie from "js-cookie";
import moment from "moment";
import { login } from "../../store/auth";
import Modal from "../ui/Modal";

import logo from "../../asset/moggo.png";
import style from "./LoginForm.module.scss";
import google from "../../asset/google.svg";
import kakao from "../../asset/kakao.svg";
import naver from "../../asset/naver.svg";
import {
  KAKAO_OAUTH_URL,
  NAVER_OAUTH_URL,
  GOOGLE_OAUTH_URL,
} from "../../lib/OAuth";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 에러 시 alert 대신 modal
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const loginCloseModal = () => {
    setLoginModalOpen(false);
  };

  const [overlapModalOpen, setOverlapModalOpen] = useState(false);
  const overlapCloseModal = () => {
    setOverlapModalOpen(false);
  };
  // input값 가져오기
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPw = useRef<HTMLInputElement>(null);

  // 현재 페이지에서 login 버튼
  function loginHandler(event: React.FormEvent) {
    Cookie.remove("refreshToken");
    event.preventDefault();

    // 입력된 input값 변수에 담기
    const enteredEmail = inputEmail.current!.value;
    const enteredPw = inputPw.current!.value;

    // 둘다 비어있다면 에러 출력 / 이후에 수정해야함.
    // 정합성 검사
    if (enteredEmail.trim().length === 0 || enteredPw.trim().length === 0) {
      alert("입력을 해주세요.");
      return;
    } else {
      const option = { username: enteredEmail, password: enteredPw };
      loginApi(option)
        .then((res) => {
          dispatch(login(res));
          sessionStorage.setItem("accessToken", res.accessToken);
          sessionStorage.setItem(
            "expiresAt",
            moment().add(1, "hour").format("yyyy-MM-DD HH:mm:ss")
          );
          Cookie.set("refreshToken", res.refreshToken, { secure: true });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data)
          if (err.response.data === "Error: The user doesn't exist.") {
            setOverlapModalOpen(true);
          } else {
            setLoginModalOpen(true);
            console.log(err);
          }
        });
    }
  }

  const reIssueHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/account/passwordReissue");
  };

  // 이미 로그인해 있을 경우 메인페이지로 이동시킴
  const token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <div className={style.login}>
        <div className={style.logoImg}>
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <form className={style.loginForm} onSubmit={loginHandler}>
          <input
            className={style.email}
            type="text"
            required
            id="email"
            ref={inputEmail}
            placeholder="이메일"
            autoComplete="on"
          />
          <input
            className={style.password}
            type="password"
            required
            id="password"
            ref={inputPw}
            placeholder="비밀번호"
          />
          <button
            className={`${style.purpleButton} ${style.loginButton}`}
            type="submit"
          >
            로그인
          </button>
        </form>
        <div className={style.resetSignup}>
          <div onClick={reIssueHandler}>비밀번호 재설정</div>
          <div
            onClick={() => {
              navigate("/account/signup");
            }}
          >
            회원가입
          </div>
        </div>

        <div className={style.socialLogin}>
          <div className={style.sns}>SNS 계정으로 간편하게 시작하기</div>
          <React.Fragment>
            <Modal
              open={loginModalOpen}
              close={loginCloseModal}
              header="로그인 에러"
            >
              <p>비밀번호가 틀렸습니다.</p>
            </Modal>
            <Modal
              open={overlapModalOpen}
              close={overlapCloseModal}
              header="로그인 에러"
            >
              <p>탈퇴한 회원입니다.</p>
            </Modal>
          </React.Fragment>
          <div className={style.socialLink}>
            <a href={GOOGLE_OAUTH_URL}>
              <img src={google} alt="google" />
            </a>
            <a href={KAKAO_OAUTH_URL}>
              <img src={kakao} alt="kakao" />
            </a>
            <a href={NAVER_OAUTH_URL}>
              <img src={naver} alt="naver" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
