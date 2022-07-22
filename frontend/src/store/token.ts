import { createSlice } from "@reduxjs/toolkit";

// 해당 데이터 타입 지정
export interface TokenState {
  token: string|null;
  isLoggedIn: boolean;
} 

// 초기 state 상태
const initialState: TokenState = {
  token: null,
  isLoggedIn: false,
};

// 해당 데이터에 접근할 때에는 , useSelector 를 이용하여 state를 조회,
// useDispatch를 이용하면 action을 줄 수 있음.

// 새로운 슬라이스
export const tokenSlice = createSlice({
  name: "userToken",
  // redux에서 관리할 데이터
  initialState,
  // 데이터를 다룰 reducer들
  reducers: {
    // 리덕스가 제공하는 현재 상태를 state 인자로 받음.
    token: (state, action) => {
      state.token = action.payload.token
      state.isLoggedIn = !!token
    },
  },
});

export const { token } = tokenSlice.actions;

export default tokenSlice.reducer;
