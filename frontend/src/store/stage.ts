import { createSlice } from "@reduxjs/toolkit";
import { PostItemState } from "./post";

export interface StageSaveState {
  name: string | null;
  content: string | null;
  img: string | undefined;
}

export interface StageState extends StageSaveState {
  id: number | null;
  createDate: number | null;
  modifiedDate: number | null;
  postList: PostItemState[] | null;
}

const initialStagesState: StageState[] = [];

export const stageSlice = createSlice({
  name: "stages",
  initialState: initialStagesState,
  reducers: {
    fetchStage(state, action) {
      state = [];
      action.payload.map((stage: StageState) => state.push(stage));
      return state;
    },
  },
});

export const { fetchStage } = stageSlice.actions;
export default stageSlice.reducer;
