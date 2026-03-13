import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice.js";
import themeReducer from "./themeSlice.js";

const persistConfig = {
  key: "track-job",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducers = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
