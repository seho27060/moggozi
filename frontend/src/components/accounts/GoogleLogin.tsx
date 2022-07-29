import React from "react";
import { GOOGLE_AUTH_URL } from "../../lib/OAuth"

const GoogleLogin: React.FC = () => {
  return (
    <a href={GOOGLE_AUTH_URL}>
      구글 계정 로그인
    </a>
  );
};
export default GoogleLogin;
