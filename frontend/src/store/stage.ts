import { createSlice } from "@reduxjs/toolkit";
import { PostItemState } from "./post";

export interface StageSaveState {
  name: string | null;
  content: string | null;
  stageImg: string | undefined;
}

export interface StageState extends StageSaveState {
  id: number | null;
  challengeId: number | null;
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
      action.payload.map((stage: StageState) => {
        return state.push(stage);
      });
    },
    addStage(state, action) {
      state.push(action.payload);
    },
    deleteStage(state, action) {
      state = state.filter((item) => action.payload !== item.id);
    },
    updateStage(state, action) {
      const index = state.findIndex((stage) => stage.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export const { fetchStage, addStage, deleteStage, updateStage } =
  stageSlice.actions;
export default stageSlice.reducer;
