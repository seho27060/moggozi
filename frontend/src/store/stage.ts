import { createSlice } from "@reduxjs/toolkit";
import { PostItemState } from "./post";

export interface StageState {
  id: number | null;
  challengeId: number | null;
  name: string | null;
  period: number | null;
  content: string | null;
  stageImg: string | undefined;
  createDate: number | null;
  modifiedDate: number | null;
  postOrder: number | null;
  postList: PostItemState[] | null;
}

const initialStagesState: StageState[] = [];

export const stageSlice = createSlice({
  name: "stages",
  initialState: initialStagesState,
  reducers: {
    fetchStage(state, action) {
      action.payload.map((stage: StageState) => {
        return state.push(stage);
      });
    },
  },
});

export const { fetchStage } = stageSlice.actions;
export default stageSlice.reducer;
