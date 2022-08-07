import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface PostData {
  id: number;
  title: string | null;
  content: string | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
  postImg: string | null;
  likeNum: number | null;
  liked: boolean | null;
  writer: UserInfo | null;
}

export interface PostItem {
  id: number | null;
  title: string | null;
  likeCount: number | null;
  img: string | null;
  writer: UserInfo;
}
export interface PostList {
  posts: PostData[] | null;
}

const initialPostState: PostList = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    postSet: (state: PostList, action) => {
      console.log("postSet", action);
      const unorderedPosts = action.payload;
      unorderedPosts.sort((a: PostData, b: PostData) =>
        a.id! >= b.id! ? 1 : -1
      );
      state.posts = unorderedPosts;
    },
    postRegister: (state: PostList, action) => {
      console.log("postRegister", action);
      state.posts = [...state.posts!, action.payload];
    },
    postModify: (state: PostList, action) => {
      console.log("postModity", action);
      const postsModified = state.posts!.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = [...postsModified, action.payload];
    },
    postRemove: (state: PostList, action) => {
      console.log("postRemove", action);
      state.posts = state.posts!.filter(
        (post) => post.id !== action.payload.id
      );
    },
  },
});

export const { postSet, postModify, postRegister, postRemove } =
  postSlice.actions;

export default postSlice.reducer;
