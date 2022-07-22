import type { RootState } from "../../store/store";

import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/user";
import { token } from '../../store/token'

import axios from "axios";
// import SocialLoginForm from "./SocialLoginForm";


const LoginForm = () => {
  const dispatch = useDispatch();

  // State 접근하기 (useSelector -> rootstate -> 인자 찾기 )
  const currentState = useSelector((state: RootState) => state);
  const currentStateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(currentState)
  }

  // input값 가져오기
  const inputId = useRef<HTMLInputElement>(null);
  const inputPw = useRef<HTMLInputElement>(null);

  // 현재 페이지에서 login 버튼
  function loginHandler(event: React.FormEvent) {
    event.preventDefault();

    // 입력된 input값 변수에 담기
    const enteredId = inputId.current!.value;
    const enteredPw = inputPw.current!.value;

    // 둘다 비어있다면 에러 출력 / 이후에 수정해야함.
    if (enteredId.trim().length === 0 || enteredPw.trim().length === 0) {
      alert("입력을 해주세요.");
      return;
    } else {
      // axios를 위한 데이터 준비 / postman으로 임시 api
      const option: object = {
        url: "https://d197b24a-21f5-4dcf-b2b0-926255a197d0.mock.pstmn.io/testapi/first",
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTP-8",
        },
        data: {
          id: enteredId,
          password: enteredPw,
        },
      };
      axios(option)
        // 요청 성공시
        .then((res) => {
          // store => user에 있는 login에 dispatch
          console.log(res.data)
          dispatch(login(res.data));
        })
        .catch((err) => alert(err));
    }
  }


  // 토큰 다루는 함수
  function userTokenHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredId = inputId.current!.value;
    const enteredPw = inputPw.current!.value;

    if (enteredId.trim().length === 0 || enteredPw.trim().length === 0) {
      alert("입력을 해주세요.");
      return;
    } else {
      const option: object = {
        url: "https://d197b24a-21f5-4dcf-b2b0-926255a197d0.mock.pstmn.io/tokentest",
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTP-8",
        },
        data: {
          id: enteredId,
          password: enteredPw,
        },
      };
      axios(option)
        .then((res) => {
          // store => token
          console.log(res.data)
          // state - token에 값 저장 // 이게 필요한가 싶긴 함.
          dispatch(token(res.data));
          // local에 해당 토큰 저장
          localStorage.setItem("token", res.data.token)
        })
        .catch((err) => alert(err));
    }
  }

//////////////////////////////////////////////////////////////////////
//
// 현재 코드에서 form을 복제해서 사용했기 때문에 
// 4개의 input을 모두 채워주어야 요청이 감. 추후 수정해야 함 / 지금은 견본
//
//////////////////////////////////////////////////////////////////////
  
  return (
    <div>
      <h3>Login form</h3>
      <div>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email">email : </label>
            <input type="text" required id="email" ref={inputId} />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input type="password" required id="password" ref={inputPw} />
          </div>
          <button type="submit">Login</button>
        </form>

        <br />
        <form onSubmit={userTokenHandler}>
          <div>
            <label htmlFor="email">email : </label>
            <input type="text" required id="email" ref={inputId} />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input type="password" required id="password" ref={inputPw} />
          </div>
          <button type="submit">Token</button>
        </form>

        <button onClick={currentStateHandler}>event</button>
        {/* <SocialLoginForm value={"KAKAO"}></SocialLoginForm>
        <SocialLoginForm value={"GOOGLE"}></SocialLoginForm> */}
      </div>
    </div>
  );
};

export default LoginForm;
