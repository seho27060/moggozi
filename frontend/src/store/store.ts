import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import hobbyReducer from "./challenge";
import commentReducer from "./comment";
import postReducer from "./post";
import postModalReducer from './postModal'
import postStageReducer from './postStage'
import stageReducer from "./stage";
import reviewReducer from "./review";
import alertReducer from "./alert"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert : alertReducer,
    hobby: hobbyReducer,
    comment: commentReducer,
    post: postReducer,
    postModal : postModalReducer,
    postStage : postStageReducer,
    stages: stageReducer,
    review: reviewReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
