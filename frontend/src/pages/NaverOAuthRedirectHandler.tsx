import React from "react";
// import { socialLogin } from "../config"
// import Cookie from "js-cookie";

// import { useDispatch } from "react-redux"
// import { KakaoLogin } from "./../store/user"
// import { useNavigate } from "react-router-dom"

const NaverOAuthRedirectHandler: React.FC = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  let code = new URL(window.location.href).searchParams.get("code")
  // 여기서 axios를 통해 백엔드에게 인가코드 전송
  // React.useEffect(async () => {
  //  try{
  //   const Naver = await Api.get("oauth/kakao")
  //   const accessToken = Naver.data.accessToken
  //   localStorage.setItem("accessToken", accessToken)
  //   Cookie.set("refreshToken", Naver.data.refreshToken, { secure: true });
  //   navigate('/')
  //   return Naver.data
  //  }
  //  catch(error) {
  //   console.log(error)
  // } 
  // }, [])

  console.log(code)


  return <div>
    로딩 중 .....
  </div>;
};

export default NaverOAuthRedirectHandler;
