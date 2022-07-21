import React, { useRef } from "react";
// import SocialLoginForm from "./SocialLoginForm";

const LoginForm = () => {
  const inputId = useRef<HTMLInputElement>(null);
  const inputPw = useRef<HTMLInputElement>(null);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredId = inputId.current!.value;
    const enteredPw = inputPw.current!.value;

    if (enteredId.trim().length === 0 || enteredPw.trim().length === 0) {
      // 오류 메세지 출력
      return;
    }

    // 로그인 관련 함수 실행
  };

  return (
    <div>
      <h3>Login form</h3>
      <div>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">email : </label>
            <input
              type="text"
              required
              id="email"
              ref={inputId}
            />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="password"
              required
              id="password"
              ref={inputPw}
            />
          </div>
          <button type="button">Login</button>
        </form>
        {/* <SocialLoginForm value={"KAKAO"}></SocialLoginForm>
        <SocialLoginForm value={"GOOGLE"}></SocialLoginForm> */}
      </div>
    </div>
  );
};

export default LoginForm;
