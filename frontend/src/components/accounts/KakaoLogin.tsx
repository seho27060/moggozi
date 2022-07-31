import React from "react";
import { KAKAO_AUTH_URL } from "../../lib/OAuth";

const KakaoLogin: React.FC = () => {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>카카오 계정 로그인</a>
    </div>
  );
};
export default KakaoLogin;
