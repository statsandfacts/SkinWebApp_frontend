import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/questionary.slice';
import loginModalSlice from './slices/loginModal.slice';
export const store = configureStore({
  reducer: {
    questionary: counterReducer,
    loginModal: loginModalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
