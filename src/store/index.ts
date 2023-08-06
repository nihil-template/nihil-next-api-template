import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import wordReducer from '@/reducers/word.reducer';
import authReducer from '@/reducers/auth.reducer';

const reducers = combineReducers({
  word: wordReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'app',
  storage,
  whitelist: [ 'auth', ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
