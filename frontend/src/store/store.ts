import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import hobbyReducer from './challenge'
import commentReducer from './comment'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hobby: hobbyReducer,
    comment : commentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
