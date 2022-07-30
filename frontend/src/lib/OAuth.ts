import { socialLogin } from "../config";

// 나중에 다 환경 변수로 바꾸어야 함.

// 카카오
const KAKAO_CLIENT_ID = socialLogin.kakaoClientID;
const KAKAO_REDIRECT_URI = socialLogin.kakaoRedirectURI;

// 네이버
const NAVER_CLIENT_ID = socialLogin.naverClientID;
const NAVER_REDIRECT_URI = socialLogin.naverRedirectURI;
// const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// 구글
const GOOGLE_CLIENT_ID = socialLogin.googleClientID;
const GOOGLE_REDIRECT_URI = socialLogin.googleRedirectURI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=state`;

// export const NAVER_AUTH_ACCESS_URL = `https://nid.naver.com/oauth2.0/token?client_id=${NAVER_CLIENT_SECRET}&grant_type=authorization_code&state=state&code=`

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
