import { createSlice } from "@reduxjs/toolkit";
import { Value } from "react-quill";
import { UserInfo } from "./auth";
import { ReviewState } from "./review";
import { StageState } from "./stage";

// 챌린지 리스트 정보
export interface ChallengeItemState {
  id: number | null;
  name: string | null;
  img: string | undefined | null;
  description: string | null;
  hobbyList: Hobby[];
  writer: UserInfo;
  level: number | null;
  userProgress: number | 0;
  likeNum: number | null;
  state: number | 1;
  modifiedDate: string | null;
}

// 챌린지 디테일 정보
export interface ChallengeDetailState extends ChallengeItemState {
  createdTime: string | null;
  modifiedTime: string | null;
  content: string | null;
  stageList: StageState[];
  // 리뷰
  reviewList: ReviewState[];
  hobbyList: Hobby[];
  liked: boolean | false;
}

// 챌린지 저장할 때 Form
export interface ChallengeSaveState {
  name: string | null;
  description: string | null;
  img: string | null;
  content: Value | string | null;
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
      state.hobbyCnt = state.hobbyList.length;
    },
    resetHobby(state) {
      state.hobbyList = [];
      state.hobbyCnt = 0;
    },
  },
});

export const { addHobby, deleteHobby, fetchHobby, resetHobby } =
  hobbySlice.actions;

export default hobbySlice.reducer;
