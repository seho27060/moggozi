import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";
import { StageState } from "./stage";

// 챌린지 리스트 정보
export interface ChallengeItemState {
  id: number | null;
  name: string | null;
  img: string | null;
  description: string | null;
  hobbyList: Hobby[];
  writer: UserInfo;
  level: number | null;
  userProgress: number | null;
  likeNum: number | null;
}

// 챌린지 디테일 정보
export interface ChallengeDetailState {
  id: number | null;
  createdTime: string | null;
  modifiedTime: string | null;
  name: string | null;
  img: string | null;
  description: string | null;
  content: string | null;
  level: number | null;
  userProgress: number | null;
  writer: UserInfo;
  stageList: StageState[];
  likeNum: number | null;
  // 리뷰
  // reviewList:
  hobbyList: Hobby[];
}

// 챌린지 저장할 때 Form
export interface ChallengeSaveState {
  name: string | null;
  description: string | null;
  img: string | null;
  content: string | null;
  hobbyList: Hobby[];
  level: number | null;
}

export interface HobbyState {
  hobbyList: Hobby[];
  hobbyCnt: number;
}

export interface Hobby {
  id: number | null;
  name: string | null;
}

const initialHobbyState: HobbyState = {
  hobbyList: [],
  hobbyCnt: 0,
};

export const hobbySlice = createSlice({
  name: "hobby",
  initialState: initialHobbyState,
  reducers: {
    addHobby(state, action) {
      state.hobbyList.push(action.payload);
      state.hobbyCnt = state.hobbyList.length;
    },
    deleteHobby(state, action) {
      state.hobbyList = state.hobbyList.filter(
        (item) => action.payload !== item.id
      );
      state.hobbyCnt = state.hobbyList.length;
    },
    fetchHobby(state, action) {
      state.hobbyList = action.payload;
      state.hobbyCnt = state.hobbyCnt = state.hobbyList.length;
    },
  },
});

export const { addHobby, deleteHobby, fetchHobby } = hobbySlice.actions;

export default hobbySlice.reducer;
