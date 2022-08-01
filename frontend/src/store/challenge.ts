import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface Hobby {
  id: number | null;
  name: string | null;
}

// 챌린지 리스트 정보
export interface ChallengeItemState {
  id: number | null;
  name: string | null;
  img: string | null;
  description: string | null;
  hobbies: Hobby[];
  writer: UserInfo;
  level: number | null;
  userProgress: number | null;
}

const initialChallengesRankState: ChallengeItemState[] = [];

export const challengesSlice = createSlice({
  name: "challenges",
  initialState: initialChallengesRankState,
  reducers: {
    challengeCreate: (state, action) => {
      state.push(action.payload);
    },
    challengeUpdate: (state, action) => {},
    challengeDelete: (state, action) => {},
  },
});

// 챌린지 디테일 정보
export interface ChallengeDetailState {
  id: number | null;
  create_time: string | null;
  update_time: string | null;
}

const initialChallengeDetailState: ChallengeDetailState[] = [];

export const challengeSlice = createSlice({
  name: "challenge",
  initialState: initialChallengeDetailState,
  reducers: {
    challengeCreate: (state, action) => {
      state.push(action.payload);
    },
    challengeUpdate: (state, action) => {},
    challengeDelete: (state, action) => {},
  },
});

export const { challengeCreate } = challengesSlice.actions;

export default challengesSlice.reducer;
