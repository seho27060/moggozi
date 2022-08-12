import { createSlice } from "@reduxjs/toolkit";
import { Value } from "react-quill";
import { PostItem } from "./post";

export interface StageSaveState {
  name: string | null;
  content:Value |string | null;
  img: imgState[] | string;
}

export interface imgState {
  id: number | null;
  url: string | null;
}

export interface StageState extends StageSaveState {
  id: number | null;
  createDate: number | null;
  modifiedDate: number | null;
  postList: PostItem[] | null;
  state: number | 0;
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
