import { createSlice } from "@reduxjs/toolkit";

import { PostData } from "./post";

interface PostStage {
  postStageList: PostData[];
  postCount : number,
}
const initialPostStageState: PostStage = {
  postStageList: [],
  postCount : 0
};

export const postStageSlice = createSlice({
  name: "postModal",
  initialState: initialPostStageState,
  reducers: {
    setPostStageList: (state, action) => {
      state.postStageList = [...state.postStageList,...action.payload!];
    },
    setPostCount: (state,action) => {
      state.postCount = action.payload
    }
  },
});

export const { setPostStageList } = postStageSlice.actions;

export default postStageSlice.reducer;
