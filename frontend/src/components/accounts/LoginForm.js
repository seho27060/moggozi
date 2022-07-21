import { useState, useEffect } from "react";
import SocialLoginForm from "./SocialLoginForm";

function LoginForm() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const inputIdHandler = (e) => {
    setInputId(e.target.value);
  };
  const inputPwHandler = (e) => {
    setInputPw(e.target.value);
  };

  function onClickLogin() {
    console.log(inputId,inputPw)
    // axios 로 login api 접근
  }
  
  useEffect(() =>{
    console.log("this is login page console")
  },[])


  return (
    <div>
      <h3>Login form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">email : </label>
            <input type="text" required id="email" value={inputId} onChange ={inputIdHandler}/>
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input type="password" required id="password" value={inputPw} onChange ={inputPwHandler}/>
          </div>
          <button type ='button' onClick={onClickLogin}>Login</button>
        </form>
        <SocialLoginForm value={"KAKAO"}></SocialLoginForm>
        <SocialLoginForm value={'GOOGLE'}></SocialLoginForm>
      </div>
    </div>
  );
}

export default LoginForm;
