import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/Products/productApi";
import { authApi } from "./features/Auth/authApi";
import authSlice from "./features/Auth/authSlice ";
import cartSlice from "./slices/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categoryApi } from "./features/Category/categoryApi";

const persistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      categoryApi.middleware
    ),
});

export const persistor = persistStore(store);
