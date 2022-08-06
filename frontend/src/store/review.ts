import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./auth";

export interface Review {
  id: number | null;
  createdTime: string | null;
  modifiedTime: string | null;
  content: string | null;
  rate: number | null;
  writer: UserInfo;
}

export interface ReviewState {
  reviewList: Review[];
  rate: number;
}

const initialReviewState: ReviewState = {
  reviewList: [],
  rate: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState: initialReviewState,
  reducers: {
    reviewFetch(state, action) {
      state.reviewList = [];
      action.payload.map((review: Review) => state.reviewList.push(review));
      return state;
    },
    rateChange(state, action) {
      state.rate = action.payload;
    },
  },
});

export const { reviewFetch, rateChange } = reviewSlice.actions;
export default reviewSlice.reducer;
