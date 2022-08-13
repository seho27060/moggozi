import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface notice {
  title: string | null;
  content: string | null;
}

interface noticeState {
  notice: notice;
  noticeList: notice[];
}
const initialNoticeState: noticeState = {
  notice: {
    content: null,
    title: null,
  },
  noticeList: [],
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState: initialNoticeState,
  reducers: {
    noticeSet: (state: noticeState, action) => {
      console.log("noticeSet", action);
      state.notice = action.payload;
    },
    noticeRegister: (state: noticeState, action) => {
      console.log("noticeRegister", action);
      state.noticeList = [...state.noticeList!, action.payload];
    },
    // commentModify: (state: noticeState, action) => {
    //   console.log("noticeModify", action);
    //   //0(숨김), 1(활성), 2(삭제)
    //   const commentsModified = state.comments!.filter(
    //     (notice) => notice.id !== action.payload.id
    //   );
    //   state.comments = [...commentsModified, action.payload];
    // },
    // commentRemove: (state: noticeState, action) => {
    //   console.log("commentRemove", action);
    //   //0(숨김), 1(활성), 2(삭제)
    //   state.comments = state.comments!.filter(
    //     (notice) => notice.id !== action.payload
    //   );
    // },
  },
});

export const { noticeSet, noticeRegister} =
noticeSlice.actions;
export default noticeSlice.reducer;
