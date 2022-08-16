import { createSlice } from "@reduxjs/toolkit";
import { Value } from "react-quill";
import { PostImgData } from "./post";

export interface UserChallengeType {
  id: number | null;
  img: string | null;
  level: number | null;
  state: number | null;
  name: string | null;
}

export interface UserPostType {
  id: number;
  title: string | null;
  content: Value | string | null;
  createdDate: Date | null;
  modifiedDate: Date | null;
  likeNum: number | null;
  postImg: PostImgData[];
  state: number | null;
  postLikeList: {
    id: number | null;
  }[];
  postComment: {
    createdDate: Date | null;
    modifiedDate: Date | null;
    id: number;
    text: string | null;
    parent: number | null;
    commentOrder: number | null;
    state: number | null;
  }[];
}
interface UserPageState {
  UserPagePostList: UserPostType[];
}
const initialUserPageState: UserPageState = {
  UserPagePostList: [],
};

export const userPageSlice = createSlice({
  name: "stages",
  initialState: initialUserPageState,
  reducers: {
    setUserPagePostList(state, action) {
      console.log("setUserPagePostList", action);
      state.UserPagePostList = [...action.payload];
    },
    modifyUserPagePostList(state, action) {
      console.log("modifyUserPagePostList", action);
      let modifiedUserPagePostList = state.UserPagePostList!.filter(
        (post) => post.id !== action.payload.id
      )
      modifiedUserPagePostList = [...modifiedUserPagePostList,action.payload]
      modifiedUserPagePostList.sort((a:UserPostType,b:UserPostType)=>
    	(a.id < b.id) ? 1 : -1)
      state.UserPagePostList = modifiedUserPagePostList;
    },
  },
});

export const { setUserPagePostList,modifyUserPagePostList } = userPageSlice.actions;
export default userPageSlice.reducer;
