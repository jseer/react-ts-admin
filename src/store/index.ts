import { getItem } from 'src/utils/common';
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global';
import { createLogger } from 'redux-logger';

const store = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
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