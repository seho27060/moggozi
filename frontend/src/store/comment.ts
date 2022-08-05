import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface Comment {
  id: number;
  state: number | null; // 삭제,숨김,활성
  order: number;
  parentId: number | null;
  text: string | null;
  writer: UserInfo | null;
  createdTime: Date | null;
  modifiedTime: Date | null;
}

export interface CommentListState {
  comments: Comment[] | null;
}

const initialCommentState: CommentListState = {
  comments: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialCommentState,
  reducers: {
    commentAdd: (state, action) => {
      state.comments?.push(action.payload)
    },
    commentDelete: (state, action) => {
    },
    commentUpdate: (state, action) => {

    },
    commentSet: (state,action) => {
      state.comments = action.payload.comments
    }
  },
});

export const {commentAdd, commentDelete, commentUpdate,commentSet} = commentSlice.actions
export default commentSlice.reducer;
