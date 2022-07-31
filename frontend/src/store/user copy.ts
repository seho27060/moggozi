import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

// interface(type) 을 통해 우리가 관리할 state의 형태를 먼저 잡아줌
export interface UserState {
  userInfo: UserInfo;
  token: string | null;
  isLoggedIn: boolean;
}

// 중첩문 안의 객체도 모든 타입을 지정해줘야 한다.
export interface UserInfo {
  userId: number | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  introduce: string | null;
  userImg: string | null;
}

// user_id: number | null;
// email: string | null;
// name: string | null;
// nickname: string | null;
// introduce: string | null;
// is_private: number | null;
// img: string | null;
// state: number | null;
// 해당 데이터 타입을 밑에서 바로 사용해준다.
// 해당 구간은 따로 models 파일로 빼도 될 것 같음.

// 현재 로그인 유무를 판별하는 State / 기본상태는 null (빈 데이터)

const initialToken = localStorage.getItem("accessToken");
// 가지고 있는 토큰으로 해당 데이터 가져와서 state 덮어주기 (로그인 상태 유지)
// if (initialToken) {
//   axios.
// }

const initialState: UserState = {
  userInfo: {
    userId: null,
    email: null,
    name: null,
    nickname: null,
    introduce: null,
    userImg: null,
  },
  token: initialToken,
  isLoggedIn: !!initialToken,
};

// 해당 데이터에 접근할 때에는 , useSelector 를 이용하여 state를 조회
// useDispatch를 이용하면 action을 줄 수 있다.

// 새로운 슬라이스
export const userSlice = createSlice({
  // 슬라이스의 이름
  name: "userInfo",
  // redux에서 관리할 데이터
  initialState,
  // 데이터를 다룰 reducer들
  reducers: {
    // 리덕스가 제공하는 현재 상태를 state 인자로 받음. // "전달받은" 인자는 action.payload
    login: (state, action) => {
      console.log("페이로드");
      console.log(action.payload);
      state.userInfo = {
        userId: action.payload.id,
        email: action.payload.username,
        name: action.payload.fullname,
        nickname: action.payload.nickname,
        introduce: action.payload.introduce,
        userImg: action.payload.user_img,
      };
      state.token = action.payload.accessToken;
      state.isLoggedIn = !!action.payload.accessToken;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("id");
      Cookie.remove("refreshToken");
    },
    // 로그인 유지 관련 리듀서 // 로그인 유지 api 보고 수정해야함.
    authentication: (state, action) => {
      state.userInfo = {
        userId: action.payload.id,
        email: action.payload.username,
        name: action.payload.fullname,
        nickname: action.payload.nickname,
        introduce: action.payload.introduce,
        userImg: action.payload.user_img,
      };
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
    },
    KakaoLogin: (state, action) => {

    }
  },
});

export const { login, logout, authentication, KakaoLogin } = userSlice.actions;

export default userSlice.reducer;
