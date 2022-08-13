import { createSlice } from "@reduxjs/toolkit";

export interface Notice {
  id:number|null,
  title: string | null;
  content: string | null;
  updatedDate : Date |null
  createdDate : Date |null
}
interface NoticeState {
  notice: Notice;
  noticeList: Notice[];
}
const initialNoticeState: NoticeState = {
  notice: {
    id:null,
    content: null,
    title: null,
    updatedDate: null,
    createdDate : null
  },
  noticeList: [],
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState: initialNoticeState,
  reducers: {
    setNotice: (state: NoticeState, action) => {
      console.log("noticeSet", action);
      state.notice = action.payload;
    },
    setNoticeList: (state: NoticeState, action) => {
      console.log("noticeSet", action);
      state.noticeList = [...action.payload];
    },
  },
});

export const { setNotice, setNoticeList } = noticeSlice.actions;
export default noticeSlice.reducer;
