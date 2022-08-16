import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface Comment {
  id: number;
  state: number | null; // 삭제,숨김,활성
  order: number;
  parentId: number | null;
  text: string | null;
  writer: UserInfo | null;
  createdTime: Date | string|null;
  modifiedTime: Date | string|null;
}

// state : 0(숨김), 1(활성), 2(삭제)
export interface CommentSend {
  postId: number | null;
  text: string | null;
  parent: number | null;
  order: number | null;
  state: number | null;
}

export interface CommentListState {
  comments: Comment[] | null;
}

const initialCommentState: CommentListState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialCommentState,
  reducers: {
    commentSet: (state: CommentListState, action) => {
      console.log("commentSet", action);
      state.comments = action.payload;
    },
    commentRegister: (state: CommentListState, action) => {
      console.log("commentRegister", action);
      state.comments = [...state.comments!, action.payload];
    },
    commentModify: (state: CommentListState, action) => {
      console.log("commentModify", action);
      //0(숨김), 1(활성), 2(삭제)
      const commentsModified = state.comments!.filter(
        (comment) => comment.id !== action.payload.id
      );
      state.comments = [...commentsModified, action.payload];
    },
    commentRemove: (state: CommentListState, action) => {
      console.log("commentRemove", action);
      //0(숨김), 1(활성), 2(삭제)
      state.comments = state.comments!.filter(
        (comment) => comment.id !== action.payload
      );
    },

  },
});

export const {
  commentSet,
  commentRegister,
  commentModify,
  commentRemove,
} = commentSlice.actions;
export default commentSlice.reducer;
