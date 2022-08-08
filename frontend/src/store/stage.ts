import { createSlice } from "@reduxjs/toolkit";
import { PostItem } from "./post";

export interface StageSaveState {
  name: string | null;
  content: string | null;
  img: string | undefined;
}

export interface StageState extends StageSaveState {
  id: number | null;
  createDate: number | null;
  modifiedDate: number | null;
  postList: PostItem[] | null;
}

const initialStagesState: StageState[] = [];

export const stageSlice = createSlice({
  name: "stages",
  initialState: initialStagesState,
  reducers: {
    stageFetch(state, action) {
      state = [];
      action.payload.map((stage: StageState) => state.push(stage));
      return state;
    },
  },
});

export const { stageFetch } = stageSlice.actions;
export default stageSlice.reducer;
