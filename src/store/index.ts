import { getItem } from 'src/utils/common';
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global';
import { createLogger } from 'redux-logger';
import userSlice from './user';
import roleSlice from './role';

const store = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [roleSlice.name]: roleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
    if (process.env.NODE_ENV === 'development') {
      return middleware.prepend(createLogger());
    }
    return middleware;
  },
  devTools:
    process.env.NODE_ENV === 'development' || getItem('devTools') === true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;