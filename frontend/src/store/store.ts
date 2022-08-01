import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import challengesReducer from './challenge'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenge: challengesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
