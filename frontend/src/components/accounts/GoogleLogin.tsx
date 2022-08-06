import React from "react";
import { GOOGLE_AUTH_URL } from "../../lib/OAuth"

const GoogleLogin: React.FC = () => {
  return (
    <a href={GOOGLE_AUTH_URL}>
      구글
    </a>
  );
};
export default GoogleLogin;
