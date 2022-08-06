import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface ReviewState {
  id: number | null;
  createdTime: string | null;
  modifiedTime: string | null;
  content: string | null;
  rate: number | null;
  writer: UserInfo;
}

const initialReviewState: ReviewState[] = [];

export const reviewSlice = createSlice({
  name: "review",
  initialState: initialReviewState,
  reducers: {
    reviewFetch(state, action) {
      state = [];
      action.payload.map((review: ReviewState) => state.push(review));
      return state;
    },
  },
});

export const { reviewFetch } = reviewSlice.actions;
export default reviewSlice.reducer;
