import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeslice';
import listsReducer from '../slices/listsSlice';
import historyReducer from '../slices/historySlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    lists: listsReducer,
    history: historyReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch