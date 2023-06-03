import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import modalReducer from '@/features/modalSlice';
import sideNavSlice from '@/features/sideNavSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    sideNav: sideNavSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
