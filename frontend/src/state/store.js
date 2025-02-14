import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    authReducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
