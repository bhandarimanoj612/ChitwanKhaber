import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import loginSignupReducer from "../feature/loginSignupReducer";
import { authReducer } from "../feature/authReducer";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import postReducer from "../feature/postReducer";
import commentSlice from "../feature/commentSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: ["authenticate"],
};

const rootReducer = combineReducers({
  loginSignup: loginSignupReducer,
  authenticate: authReducer,
  posts: postReducer,
  comments: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export default store;
