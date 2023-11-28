import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/loginSlice";
import documentReducer from "./features/documentSlice";
import archiveReducer from "./features/archiveSlice";
import broadcastReducer from "./features/broadcastSlice";
import docsHard_Slice from "./features/docsHard_scan_archive_Slice";
import adminSlice from "./features/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    documents: documentReducer,
    broadcast: broadcastReducer,
    archive: archiveReducer,
    docsHard_scan_archive: docsHard_Slice,
    adminSlice : adminSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
