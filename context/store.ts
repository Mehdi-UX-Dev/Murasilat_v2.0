import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/loginSlice";
import documentReducer from "./features/documentSlice";
import archiveReducer from "./features/archiveSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    documents: documentReducer,
    archive: archiveReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
