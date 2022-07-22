import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import tokenReducer from './token'


export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
