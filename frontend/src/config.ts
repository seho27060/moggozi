// .env 파일에 주소를 적고
// 해당 파일에서 서버 주소등을 불러다 씀

export const apiConfig = {
  apiRoot: process.env.REACT_APP_API_ROOT
}

export const socialLogin = {
  kakaoClientID: process.env.REACT_APP_KAKAO_CLIENT_ID,
  kakaoRedirectURI: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  naverClientID: process.env.REACT_APP_NAVER_CLIENT_ID,
  naverRedirectURI: process.env.REACT_APP_NAVER_REDIRECT_URI,
  googleClientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  googleRedirectURI: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
}
