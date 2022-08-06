import React from "react";
import { NAVER_AUTH_URL } from "../../lib/OAuth"

const NaverLogin: React.FC = () => {
  return (
    <a href={NAVER_AUTH_URL}>
      네이버
    </a>
  );
};
export default NaverLogin;
