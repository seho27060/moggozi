import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface PostState {
  id: number | null;
  stageId: number | null;
  title: string | null;
  content: string | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
  img: string | null;
  writer: UserInfo;
  likeCount: number | null;
}

// 스테이지에 포함된 postings 타입np
export interface PostItemState {
  id: number | null;
  title: string | null;
  likeCount: number | null;
  img: string | null;
  writer: UserInfo;
}

interface like {
  id: number;
}
export interface PostTest {
  id: number | null;
  title: string | null;
  content: string | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
  postImg: string | null;
  postLikeList: like[]|null,
  writer : UserInfo | null
}
const initialPostState:PostTest={
  id: null,
  title:  null,
  content: null,
  createdTime: null,
  modifiedTime: null,
  postImg: null,
  postLikeList: null,
  writer : null,
}

export const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    setPostSlice:(state,action) => {
      state.id = action.payload.id
      state.title = action.payload.title
      state.content = action.payload.content
      state.createdTime = action.payload.createdTime
      state.modifiedTime = action.payload.modifiedTime
      state.postImg = action.payload.postImg
      state.postLikeList = action.payload.postLikeList
      state.writer = action.payload.writer
    }
  },
}); 
export const {setPostSlice} = postSlice.actions
export default postSlice.reducer;