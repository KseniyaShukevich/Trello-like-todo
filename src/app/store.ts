import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeslice';
import listsSlice from '../slices/listsSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    lists: listsSlice,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch