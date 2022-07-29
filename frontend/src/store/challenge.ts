import { createSlice } from "@reduxjs/toolkit";
import { UserNameInfo } from "./user";

export interface hobby {
  id: number | null;
  name: string | null;
}

// 챌린지 리스트 정보
export interface ChallengesState {
  id: number | null;
  name: string | null;
  img: string | null;
  description: string | null;
  hobbies: hobby[];
  writer: UserNameInfo;
  level: number | null;
  user_progress: number | null;
}

// 챌린지 디테일 정보 리스트 먼저 한다.
// export interface ChallengeState {
//   id: number | null;
//   create_time: string | null;
//   update_time: string | null;
// }


const initialChallengesState: ChallengesState[] = [];

export const challengesSlice = createSlice({
  name: "challenges",
  initialState: initialChallengesState,
  reducers: {
    challengeCreate: (state, action) => {
      state.push(action.payload);
    },
    challengeUpdate: (state, action) => {

    },
    challengeDelete: (state, action) => {

    }
  }
})

export const { challengeCreate } = challengesSlice.actions;

export default challengesSlice.reducer;