import React from "react";
import { KAKAO_AUTH_URL } from "../../lib/OAuth";

const KakaoLogin: React.FC = () => {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>카카오</a>
    </div>
  );
};
export default KakaoLogin;
