import { configureStore as ConfigureStore, combineReducers } from "@reduxjs/toolkit"
import UserReducer from './userSlice'

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

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootreducer = combineReducers({
    user:persistReducer(persistConfig, UserReducer),
})
const store = ConfigureStore({
    reducer:rootreducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store