import { createSlice } from "@reduxjs/toolkit";
import { Value } from "react-quill";
import { UserInfo } from "./auth";

export interface PostData {
  id: number;
  title: string | null;
  content: Value | string | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
  postImg: PostImgData[];
  likeNum: number | null;
  liked: boolean | null;
  writer: UserInfo | null;
}

export interface PostImgData {
  path: string | null;
}

export interface PostItem {
  id: number | null;
  title: string | null;
  likeCount: number | null;
  postImg: PostImgData[];
  writer: UserInfo;
}

interface PostState {
  posts: PostData[];
  postingStageId: number | null;
  checkedPost: PostData | number;
}
const initialPostState: PostState = {
  posts: [],
  postingStageId: null,
  checkedPost: -1,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    postSet: (state, action) => {
      // console.log("postSet", action);
      const orderedPosts = action.payload;
      orderedPosts.sort((a: PostData, b: PostData) =>
        a.id! >= b.id! ? 1 : -1
      );
      state.posts = orderedPosts;
    },
    postRegister: (state, action) => {
      // console.log("postRegister", action);
      state.posts = [...state.posts!, action.payload];
    },
    postModify: (state, action) => {
      // console.log("postModity", action);
      const postsModified = state.posts!.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = [...postsModified, action.payload];
    },
    postRemove: (state, action) => {
      // console.log("postRemove", action);
      state.posts = state.posts!.filter(
        (post) => post.id !== action.payload.id
      );
    },
    setPostingStageId: (state, action) => {
      // console.log("setPostingStageId", action);
      state.postingStageId = action.payload;
    },
    setCheckedPost: (state, action) => {
      // console.log("setCheckedPost",action)
      state.checkedPost = action.payload;
    },
  },
});

export const {
  postSet,
  postModify,
  postRegister,
  postRemove,
  setPostingStageId,
  setCheckedPost,
} = postSlice.actions;

export default postSlice.reducer;
