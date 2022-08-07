import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

interface like {
  id: number;
}

export interface PostTest {
  id: number;
  title: string | null;
  content: string | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
  postImg: string | null;
  postLikeList: like[] | null;
  writer: UserInfo | null;
}

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
export interface PostItemState {
  id: number | null;
  title: string | null;
  likeCount: number | null;
  img: string | null;
  writer: UserInfo;
}
export interface PostListState {
  posts: PostTest[] | null;
}

const initialPostState: PostListState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    postSet: (state: PostListState, action) => {
      console.log("postSet", action);
      const unorderedPosts = action.payload;
      unorderedPosts.sort((a: PostTest, b: PostTest) =>
        a.id! >= b.id! ? 1 : -1
      );
      state.posts = unorderedPosts;
    },
    postRegister: (state: PostListState, action) => {
      console.log("postRegister", action);
      state.posts = [...state.posts!, action.payload];
    },
    postModify: (state: PostListState, action) => {
      console.log("postModity", action);
      const postsModified = state.posts!.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = [...postsModified,action.payload]
    },
    postRemove: (state: PostListState, action) => {
      console.log("postRemove", action);
      state.posts = state.posts!.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { postSet, postModify, postRegister, postRemove } =
  postSlice.actions;

export default postSlice.reducer;
