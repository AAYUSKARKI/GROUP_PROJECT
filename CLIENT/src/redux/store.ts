import { configureStore as ConfigureStore, combineReducers } from "@reduxjs/toolkit"
import UserReducer from './userSlice'
import ThemeSlice from "./ThemeSlice";
import ProductSlice from "./ProductSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define individual persist configurations
const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
}

const themePersistConfig = {
  key: 'theme',
  version: 1,
  storage,
}

const productPersistConfig = {
  key: 'products',
  version: 1,
  storage,
}

// Apply persistReducer to each reducer
const persistedUserReducer = persistReducer(userPersistConfig, UserReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, ThemeSlice);
const persistedProductReducer = persistReducer(productPersistConfig, ProductSlice);

// Combine the persisted reducers
const rootReducer = combineReducers({
  user: persistedUserReducer,
  theme: persistedThemeReducer,
  products: persistedProductReducer,
});

// Configure the store
const store = ConfigureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      
    },
  }),
});
export default store