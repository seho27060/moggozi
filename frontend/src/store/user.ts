import { createSlice } from "@reduxjs/toolkit";

// interface(type) 을 통해 우리가 관리할 state의 형태를 먼저 잡아줌
export interface UserState {
  user_id: number | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  introduce: string | null;
  is_private: number | null;
  img: string | null;
  state: number | null;
  token: string | null;
  isLoggedIn: boolean;
}

// 해당 데이터 타입을 밑에서 바로 사용해준다.
// 해당 구간은 따로 models 파일로 빼도 될 것 같음.

// 현재 로그인 유무를 판별하는 State / 기본상태는 null (빈 데이터)

const initialToken = localStorage.getItem('token')
// 가지고 있는 토큰으로 해당 데이터 가져와서 state 덮어주기 (로그인 상태 유지)
// if (initialToken) {
//   axios.
// }

const initialState: UserState = {
  user_id: null,
  email: null,
  name: null,
  nickname: null,
  introduce: null,
  is_private: null,
  img: null,
  state: null,
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
      console.log(action.payload)
      // login 버튼을 눌렀을 때, 입력받은 action들을 해당 state에 저장함.
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.introduce = action.payload.introduce;
      state.is_private = action.payload.is_private;
      state.img = action.payload.img;
      state.state = action.payload.state;
      state.token = action.payload.token
      state.isLoggedIn = !!action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem("token")
    }
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
