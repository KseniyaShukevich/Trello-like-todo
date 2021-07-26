import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeslice';
import listsReducer from '../slices/listsSlice';
// import currentTodoReducer from '../slices/currentTodoSlice';
import bufferTodoReducer from '../slices/bufferTodoSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    lists: listsReducer,
    // currentTodo: currentTodoReducer,
    bufferTodo: bufferTodoReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch