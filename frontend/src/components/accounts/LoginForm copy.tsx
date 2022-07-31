import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import GoogleLogin from "./GoogleLogin";

import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import moment from "moment"
import { login } from "../../store/user";
import axios from "axios";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input값 가져오기
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPw = useRef<HTMLInputElement>(null);

  // 현재 페이지에서 login 버튼
  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    // 입력된 input값 변수에 담기
    const enteredEmail = inputEmail.current!.value;
    const enteredPw = inputPw.current!.value;

    try {
      const userData = await loginAPI({ enteredEmail, enteredPw }).unwrap();
      dispatch()
    } catch (error) {

    }
  }

  // 이미 로그인해 있을 경우 메인페이지로 이동시킴
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div>
      <h3>Login form</h3>
      <div>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">email : </label>
            <input type="text" required id="email" ref={inputEmail} />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input type="password" required id="password" ref={inputPw} />
          </div>
          <button type="submit">Login</button>
        </form>
        <p><KakaoLogin /></p>
        <p><NaverLogin /></p>
        <p><GoogleLogin /></p>
        <p></p>
        {/* <SocialLoginForm value={"KAKAO"}></SocialLoginForm>
        <SocialLoginForm value={"GOOGLE"}></SocialLoginForm> */}
      </div>
    </div>
  );
};

export default LoginForm;
