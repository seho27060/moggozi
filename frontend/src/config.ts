// .env 파일에 주소를 적고
// 해당 파일에서 서버 주소등을 불러다 씀

export const apiConfig = {
  apiRoot: process.env.REACT_APP_API_ROOT
}

export const socialLogin = {
  kakaoOAuthURL: process.env.REACT_APP_KAKAO_OAUTH_URL,
  naverOAuthURL: process.env.REACT_APP_NAVER_OAUTH_URL,
  googleOAuthURL: process.env.REACT_APP_GOOGLE_OAUTH_URL,
}
