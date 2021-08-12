import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slices/themeslice';
import listsReducer from '../slices/listsSlice';
import bufferTodoReducer from '../slices/bufferTodoSlice';
import historyReducer from '../slices/historySlice';
import listsDraggingReducer from '../slices/listsDraggingSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    lists: listsReducer,
    bufferTodo: bufferTodoReducer,
    history: historyReducer,
    listsDragging: listsDraggingReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch